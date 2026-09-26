import base64
import json

import requests
from django.conf import settings
from django.utils import timezone

from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from .models import Payment, EsewaRedrectUrls
from .serializers import PaymentSerializer
from .utils import generate_esewa_signature


class PaymentViewSet(viewsets.ModelViewSet):

    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        # Admin can see all payments
        if user.is_staff:
            return Payment.objects.all()

        # Normal user can see only their own payments
        return Payment.objects.filter(
            booking__user=user
        )

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        # Validate booking
        serializer.is_valid(
            raise_exception=True
        )

        # Create payment
        payment = serializer.save()

        # --------------------------------
        # eSewa payment information
        # --------------------------------

        total_amount = str(payment.amount)

        transaction_uuid = str(
            payment.transaction_uuid
        )

        product_code = settings.ESEWA_PRODUCT_CODE

        # Generate eSewa signature
        signature = generate_esewa_signature(
            total_amount=total_amount,
            transaction_uuid=transaction_uuid,
            product_code=product_code,
        )

        # Return everything frontend needs to build the POST form
        return Response(
            {
                "payment_id": payment.id,

                # Base product amount (no tax/charges for rental)
                "amount": total_amount,

                # total_amount = amount + tax_amount + service + delivery
                # Since tax=0, service=0, delivery=0 → total_amount == amount
                "total_amount": total_amount,

                "transaction_uuid": transaction_uuid,

                "product_code": product_code,

                "tax_amount": "0",

                "product_service_charge": "0",

                "product_delivery_charge": "0",

                "success_url": settings.ESEWA_SUCCESS_URL,

                "failure_url": settings.ESEWA_FAILURE_URL,

                "signed_field_names": (
                    "total_amount,"
                    "transaction_uuid,"
                    "product_code"
                ),

                "signature": signature,

                "payment_url": settings.ESEWA_PAYMENT_URL,
            },
            status=status.HTTP_201_CREATED,
        )


@api_view(["GET"])
@permission_classes([AllowAny])
def esewa_success_callback(request):
    """
    eSewa redirects here after a successful payment attempt.

    eSewa appends ?data=<Base64-encoded-JSON> to the success_url.
    This view:
      1. Decodes and parses the Base64 response from eSewa.
      2. Looks up the local Payment record by transaction_uuid.
      3. Calls the eSewa Status Check API to independently verify the payment
         (prevents fraudulent success redirects).
      4. Updates Payment and Booking status accordingly.

    Ref: https://developer.esewa.com.np/pages/Epay#statuscheck
    """

    encoded_data = request.GET.get("data")

    if not encoded_data:
        return Response(
            {"error": "No data parameter received from eSewa."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # ── Step 1: Decode the Base64 response ────────────────────────────────────
    try:
        decoded_bytes = base64.b64decode(encoded_data)
        response_data = json.loads(decoded_bytes.decode("utf-8"))
    except Exception:
        return Response(
            {"error": "Invalid Base64 data received."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    transaction_uuid = response_data.get("transaction_uuid")
    esewa_status_from_redirect = response_data.get("status")

    if not transaction_uuid:
        return Response(
            {"error": "transaction_uuid missing in eSewa response."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # ── Step 2: Find local payment record ─────────────────────────────────────
    try:
        payment = Payment.objects.select_related("booking").get(
            transaction_uuid=transaction_uuid
        )
    except Payment.DoesNotExist:
        return Response(
            {"error": "No payment record found for this transaction."},
            status=status.HTTP_404_NOT_FOUND,
        )

    # Guard: don't re-process an already completed payment
    if payment.status == "completed":
        return Response({"message": "Payment already verified."})

    # ── Step 3: Verify with eSewa Status Check API ────────────────────────────
    # Doc: GET /api/epay/transaction/status/?product_code=X&total_amount=Y&transaction_uuid=Z
    verify_url = settings.ESEWA_STATUS_URL
    params = {
        "product_code": settings.ESEWA_PRODUCT_CODE,
        "total_amount": str(payment.amount),
        "transaction_uuid": transaction_uuid,
    }

    try:
        esewa_resp = requests.get(verify_url, params=params, timeout=10)
        esewa_resp.raise_for_status()
        esewa_data = esewa_resp.json()
    except requests.RequestException as exc:
        return Response(
            {"error": f"Could not reach eSewa status check API: {exc}"},
            status=status.HTTP_502_BAD_GATEWAY,
        )

    verified_status = esewa_data.get("status", "").upper()

    # ── Step 4: Update payment & booking ──────────────────────────────────────
    if verified_status == "COMPLETE":
        payment.status = "completed"
        payment.transaction_code = esewa_data.get("ref_id")
        payment.paid_at = timezone.now()
        payment.save(update_fields=["status", "transaction_code", "paid_at", "updated_at"])

        booking = payment.booking
        booking.status = "confirmed"
        booking.save(update_fields=["status", "updated_at"])

        return Response(
            {
                "message": "Payment verified successfully.",
                "transaction_code": payment.transaction_code,
                "booking_status": booking.status,
            },
            status=status.HTTP_200_OK,
        )

    # Map eSewa statuses to our internal ones
    status_map = {
        "FULL_REFUND": "full_refund",
        "PARTIAL_REFUND": "partial_refund",
        "AMBIGUOUS": "ambiguous",
        "NOT_FOUND": "not_found",
        "CANCELED": "canceled",
        "PENDING": "pending",
    }

    payment.status = status_map.get(verified_status, "failed")
    payment.save(update_fields=["status", "updated_at"])

    return Response(
        {
            "error": "Payment not completed.",
            "esewa_status": verified_status,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def esewa_failure_callback(request):
    """
    eSewa redirects here after a failed or cancelled payment.
    Mark the payment as failed.
    """
    encoded_data = request.GET.get("data")

    if encoded_data:
        try:
            decoded_bytes = base64.b64decode(encoded_data)
            response_data = json.loads(decoded_bytes.decode("utf-8"))
            transaction_uuid = response_data.get("transaction_uuid")
            if transaction_uuid:
                Payment.objects.filter(
                    transaction_uuid=transaction_uuid,
                    status="pending",
                ).update(status="failed")
        except Exception:
            pass

    return Response(
        {"message": "Payment failed or was cancelled."},
        status=status.HTTP_200_OK,
    )


class EsewaRedrectUrlsViewSet(viewsets.ModelViewSet):

    serializer_class = None
    permission_classes = [IsAdminUser]

    queryset = EsewaRedrectUrls.objects.all()
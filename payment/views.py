from django.conf import settings

from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
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

        # Return everything frontend needs
        return Response(
            {
                "payment_id": payment.id,

                "amount": total_amount,

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


class EsewaRedrectUrlsViewSet(viewsets.ModelViewSet):

    serializer_class = None
    permission_classes = [IsAdminUser]

    queryset = EsewaRedrectUrls.objects.all()
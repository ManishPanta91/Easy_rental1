from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Booking
from .serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):

    serializer_class = BookingSerializer

    def get_queryset(self):
        user = self.request.user

        # Admin can see all bookings
        if user.is_staff:
            return Booking.objects.all()

        # Normal users can only see their own bookings
        return Booking.objects.filter(user=user)

    def get_permissions(self):

        # Authenticated users can:
        # - view their bookings
        # - create a booking
        # - cancel their pending booking
        if self.action in [
            "list",
            "retrieve",
            "create",
            "cancel",
        ]:
            return [IsAuthenticated()]

        # Admin only:
        # - confirm
        # - complete
        # - update
        # - delete
        return [IsAdminUser()]

    @action(
        detail=True,
        methods=["post"],
    )
    def cancel(self, request, pk=None):

        booking = self.get_object()

        if booking.status != "pending":
            return Response(
                {
                    "detail": "Only pending bookings can be cancelled."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.status = "cancelled"

        booking.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        serializer = self.get_serializer(booking)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAdminUser],
    )
    def confirm(self, request, pk=None):

        booking = self.get_object()

        if booking.status != "pending":
            return Response(
                {
                    "detail": "Only pending bookings can be confirmed."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.status = "confirmed"

        booking.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        serializer = self.get_serializer(booking)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAdminUser],
    )
    def complete(self, request, pk=None):

        booking = self.get_object()

        if booking.status != "confirmed":
            return Response(
                {
                    "detail": "Only confirmed bookings can be completed."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.status = "completed"

        booking.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        serializer = self.get_serializer(booking)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
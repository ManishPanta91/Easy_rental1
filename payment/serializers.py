import uuid

from rest_framework import serializers

from .models import Payment
from booking.models import Booking


class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment

        fields = [
            "id",
            "booking",
            "amount",
            "status",
            "transaction_uuid",
            "transaction_code",
            "paid_at",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "amount",
            "status",
            "transaction_uuid",
            "transaction_code",
            "paid_at",
            "created_at",
            "updated_at",
        ]

    def validate_booking(self, booking):

        request = self.context["request"]

        # Booking must belong to logged-in user
        if booking.user != request.user:
            raise serializers.ValidationError(
                "You cannot pay for this booking."
            )

        # Booking must be pending
        if booking.status != "pending":
            raise serializers.ValidationError(
                "Only pending bookings can be paid."
            )

        # Don't allow multiple payments for the same booking
        if Payment.objects.filter(booking=booking).exists():
            raise serializers.ValidationError(
                "A payment already exists for this booking."
            )

        return booking

    def create(self, validated_data):

        booking = validated_data["booking"]

        payment = Payment.objects.create(
            booking=booking,
            amount=booking.total_price,
            status="pending",
            transaction_uuid=uuid.uuid4(),
        )

        return payment
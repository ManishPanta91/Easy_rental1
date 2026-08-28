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

        user = self.context["request"].user

        # User can only pay for their own booking
        if booking.user != user:
            raise serializers.ValidationError(
                "You cannot pay for this booking."
            )

        # Booking must be pending
        if booking.status != "pending":
            raise serializers.ValidationError(
                "This booking cannot be paid for."
            )

        # Don't allow multiple payments
        if hasattr(booking, "payment"):
            raise serializers.ValidationError(
                "A payment already exists for this booking."
            )

        return booking

    def create(self, validated_data):

        booking = validated_data["booking"]

        payment = Payment.objects.create(
            booking=booking,
            amount=booking.total_price,
        )

        return payment
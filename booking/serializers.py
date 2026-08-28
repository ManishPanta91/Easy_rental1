from django.utils import timezone
from rest_framework import serializers

from .models import Booking
from vehicles.models import Vehicle


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking

        fields = [
            "id",
            "vehicle",
            "start_date",
            "end_date",
            "price_per_day",
            "total_days",
            "total_price",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "price_per_day",
            "total_days",
            "total_price",
            "status",
            "created_at",
            "updated_at",
        ]

    def validate(self, attrs):

        start_date = attrs["start_date"]
        end_date = attrs["end_date"]
        vehicle = attrs["vehicle"]

        # 1. Start date cannot be in the past
        today = timezone.localdate()

        if start_date < today:
            raise serializers.ValidationError({
                "start_date": "Start date cannot be in the past."
            })

        # 2. End date must be after or equal to start date
        if end_date < start_date:
            raise serializers.ValidationError({
                "end_date": "End date must be on or after start date."
            })

        # 3. Vehicle must be active
        if vehicle.status != "active":
            raise serializers.ValidationError({
                "vehicle": "This vehicle is not available for booking."
            })

        # 4. Check booking conflict
        conflicting_booking = Booking.objects.filter(
            vehicle=vehicle,
            status__in=["pending", "confirmed"],
            start_date__lte=end_date,
            end_date__gte=start_date,
        ).exists()

        if conflicting_booking:
            raise serializers.ValidationError({
                "vehicle": "This vehicle is already booked for these dates."
            })

        return attrs

    def create(self, validated_data):

        vehicle = validated_data["vehicle"]
        start_date = validated_data["start_date"]
        end_date = validated_data["end_date"]

        # Calculate number of days
        total_days = (
            end_date - start_date
        ).days + 1

        # Get current vehicle price
        price_per_day = vehicle.price_per_day

        # Calculate total
        total_price = (
            price_per_day * total_days
        )

        booking = Booking.objects.create(
            user=self.context["request"].user,
            vehicle=vehicle,
            start_date=start_date,
            end_date=end_date,
            price_per_day=price_per_day,
            total_days=total_days,
            total_price=total_price,
        )

        return booking
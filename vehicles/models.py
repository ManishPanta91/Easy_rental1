# vehicle/models.py

from django.db import models


class Vehicle(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()

    vehicle_type = models.CharField(max_length=50)
    transmission = models.CharField(max_length=50)
    fuel_type = models.CharField(max_length=50)

    seats = models.PositiveIntegerField()

    description = models.TextField(blank=True)

    price_per_day = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    status = models.CharField(
        max_length=20,
        default="active",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class VehicleImage(models.Model):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image = models.ImageField(
        upload_to="vehicles/",
    )

    is_primary = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )
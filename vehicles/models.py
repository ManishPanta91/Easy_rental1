# vehicle/models.py

from django.db import models

from common.models import BaseModel


class VehicleType(models.TextChoices):
    CYCLE = "cycle", "Cycle"
    SCOOTER = "scooter", "Scooter"
    MOTORCYCLE = "motorcycle", "Motorcycle"
    AUTO_RICKSHAW = "auto_rickshaw", "Auto Rickshaw"
    CAR = "car", "Car"
    JEEP = "jeep", "Jeep"
    BUS = "bus", "Bus"
    TRUCK = "truck", "Truck"


class VehicleStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    INACTIVE = "inactive", "Inactive"
    MAINTENANCE = "maintenance", "Maintenance"


class Transmission(models.TextChoices):
    MANUAL = "manual", "Manual"
    AUTOMATIC = "automatic", "Automatic"


class FuelType(models.TextChoices):
    PETROL = "petrol", "Petrol"
    DIESEL = "diesel", "Diesel"
    ELECTRIC = "electric", "Electric"
    HYBRID = "hybrid", "Hybrid"


class Vehicle(BaseModel):
    # ── Basic Info ─────────────────────────────────────────────────────────────
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    color = models.CharField(max_length=50, blank=True)

    # ── Registration & Legal ───────────────────────────────────────────────────
    registration_number = models.CharField(max_length=50, unique=True)
    registration_expiry = models.DateField(null=True, blank=True)
    insurance_expiry = models.DateField(null=True, blank=True)

    # ── Classification ─────────────────────────────────────────────────────────
    vehicle_type = models.CharField(
        max_length=50, choices=VehicleType.choices, default=VehicleType.MOTORCYCLE
    )
    transmission = models.CharField(
        max_length=50,
        choices=Transmission.choices,
        default=Transmission.MANUAL,
    )
    fuel_type = models.CharField(
        max_length=50,
        choices=FuelType.choices,
        default=FuelType.PETROL,
    )

    # ── Engine & Performance ───────────────────────────────────────────────────
    engine_cc = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Engine displacement in cubic centimetres (CC). Leave blank for electric vehicles.",
    )
    mileage_kmpl = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Fuel efficiency in km per litre (or km per charge for EVs).",
    )
    horsepower = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Maximum power output in BHP/HP.",
    )
    torque_nm = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Maximum torque in Newton-metres (Nm).",
    )
    top_speed_kmph = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Top speed in km/h.",
    )

    # ── Capacity ───────────────────────────────────────────────────────────────
    seats = models.PositiveIntegerField()
    luggage_capacity_kg = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Maximum luggage/load capacity in kilograms.",
    )
    fuel_tank_capacity_l = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Fuel tank capacity in litres. Leave blank for EVs.",
    )
    battery_range_km = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Range on full charge in km. Applicable only to EVs.",
    )

    # ── Odometer ───────────────────────────────────────────────────────────────
    odometer_km = models.PositiveIntegerField(
        default=0,
        help_text="Current odometer reading in kilometres.",
    )

    # ── Rental Pricing ─────────────────────────────────────────────────────────
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_hour = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Hourly rental rate. Optional.",
    )
    security_deposit = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Refundable security deposit amount.",
    )
    min_rental_days = models.PositiveIntegerField(
        default=1,
        help_text="Minimum number of days a renter must book.",
    )
    max_rental_days = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Maximum number of days allowed per booking. Leave blank for no limit.",
    )

    # ── Features / Amenities ───────────────────────────────────────────────────
    has_ac = models.BooleanField(default=False, help_text="Air conditioning available.")
    has_gps = models.BooleanField(default=False, help_text="GPS navigation system.")
    has_bluetooth = models.BooleanField(default=False, help_text="Bluetooth audio.")
    has_usb_charger = models.BooleanField(default=False, help_text="USB charging port.")
    has_child_seat = models.BooleanField(default=False, help_text="Child/baby seat included.")

    # ── Location & Description ─────────────────────────────────────────────────
    pickup_location = models.CharField(
        max_length=255,
        blank=True,
        help_text="Address or landmark where the vehicle is available for pickup.",
    )
    description = models.TextField(blank=True)

    # ── Status ─────────────────────────────────────────────────────────────────
    status = models.CharField(
        max_length=20,
        choices=VehicleStatus.choices,
        default=VehicleStatus.ACTIVE,
    )

    def __str__(self):
        return f"{self.brand} {self.model} ({self.year}) — {self.registration_number}"


class VehicleImage(BaseModel):
    vehicle = models.ForeignKey(
        Vehicle,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image = models.ImageField(upload_to="vehicles/")
    alt_text = models.CharField(
        max_length=200,
        blank=True,
        help_text="Short description of the image for accessibility.",
    )
    is_primary = models.BooleanField(default=False)

    class Meta:
        ordering = ["-is_primary", "created_at"]

    def __str__(self):
        return f"Image for {self.vehicle} (primary={self.is_primary})"
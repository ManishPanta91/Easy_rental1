from django.db import models

from common.models import BaseModel


class EsewaRedrectUrls(BaseModel):
    success_url = models.URLField()
    failure_url = models.URLField()


class Payment(BaseModel):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ]

    booking = models.OneToOneField(
        "booking.Booking",
        on_delete=models.PROTECT,
        related_name="payment",
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    transaction_uuid = models.CharField(
        max_length=100,
        unique=True,
    )

    transaction_code = models.CharField(
        max_length=100,
        unique=True,
        null=True,
        blank=True,
    )

    paid_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"Payment {self.id} - Booking {self.booking.id}"
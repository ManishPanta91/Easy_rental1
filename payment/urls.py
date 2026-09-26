from django.urls import path
from rest_framework.routers import DefaultRouter

from payment.views import PaymentViewSet, esewa_success_callback, esewa_failure_callback

router = DefaultRouter()
router.register(
    "payments",
    PaymentViewSet,
    basename="payment",
)

urlpatterns = router.urls + [
    # eSewa redirects to these after payment
    path("payments/esewa/success/", esewa_success_callback, name="esewa-success"),
    path("payments/esewa/failure/", esewa_failure_callback, name="esewa-failure"),
]
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import VehicleViewSet, VehicleImageViewSet

router = DefaultRouter()
router.register(r'vehicles', VehicleViewSet, basename='vehicle')
router.register(r'vehicle-images', VehicleImageViewSet, basename='vehicle-image')

urlpatterns = router.urls
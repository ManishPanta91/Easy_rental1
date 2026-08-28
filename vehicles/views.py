from rest_framework import viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import Vehicle, VehicleImage
from .serializers import VehicleImageSerializer, VehicleSerializer


class VehicleViewSet(viewsets.ModelViewSet):

    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsAdminUser()]


class VehicleImageViewSet(viewsets.ModelViewSet):

    queryset = VehicleImage.objects.all()
    serializer_class = VehicleImageSerializer

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    permission_classes = [IsAdminUser]
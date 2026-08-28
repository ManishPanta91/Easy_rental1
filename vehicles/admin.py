from django.contrib import admin

# Register your models here.
from .models import Vehicle, VehicleImage


admin.site.register(Vehicle)
admin.site.register(VehicleImage)
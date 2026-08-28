from django.contrib import admin
from .models import Vehicle, VehicleImage


class VehicleImageInline(admin.TabularInline):
    model = VehicleImage
    extra = 1


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "brand",
        "vehicle_type",
        "price_per_day",
        "status",
    )

    list_filter = (
        "vehicle_type",
        "status",
        "fuel_type",
    )

    search_fields = (
        "name",
        "brand",
        "model",
    )

    inlines = [VehicleImageInline]


admin.site.register(VehicleImage)
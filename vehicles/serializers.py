from rest_framework import serializers


from .models import Vehicle, VehicleImage



class VehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = ['id', 'image', 'is_primary', 'created_at']
        read_only_fields = ['id', 'created_at']
        
        
class VehicleSerializer(serializers.ModelSerializer):
    images = VehicleImageSerializer(many=True, read_only=True)

    class Meta:
        model = Vehicle
        fields = [
            'id',
            'name',
            'brand',
            'model',
            'year',
            'vehicle_type',
            'transmission',
            'fuel_type',
            'seats',
            'description',
            'price_per_day',
            'status',
            'created_at',
            'updated_at',
            'images'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
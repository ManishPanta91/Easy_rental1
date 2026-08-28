from rest_framework import serializers


from .models import Vehicle, VehicleImage



class VehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = ['id', 'image', 'is_primary', 'created_at']
        read_only_fields = ['id', 'created_at']
        
        
class VehicleSerializer(serializers.ModelSerializer):
    images = VehicleImageSerializer(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()

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
            'images',
            'primary_image'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'primary_image']
        
    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()

        if primary_image:
            return VehicleImageSerializer(
                primary_image,
                context=self.context
            ).data

        return None
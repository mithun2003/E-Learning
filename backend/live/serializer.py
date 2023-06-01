from rest_framework import serializers
from .models import *
from rest_framework import serializers

class LiveCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Live
        fields = ('name','thumbnail','room_code')
class LiveSerializer(serializers.ModelSerializer):
    def get_thumbnail(self, obj):
        if obj.thumbnail:
            return "http://localhost:8000" + obj.thumbnail.url
        else:
            return None

    thumbnail = serializers.SerializerMethodField(method_name='get_thumbnail')

    class Meta:
        model = Live
        fields = '__all__'
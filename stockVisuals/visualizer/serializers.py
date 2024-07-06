from rest_framework import serializers
from . models import stockData

class stockSerializer(serializers.ModelSerializer):
    class Meta:
        model = stockData
        fields = ['symbol', 'data']
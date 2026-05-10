from rest_framework import serializers
from extractor.models import Files


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['file']

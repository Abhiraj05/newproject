from rest_framework import serializers


class UserSignup(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    user_email=serializers.EmailField(unique=True)
    password=serializers.CharField(write_only=True)

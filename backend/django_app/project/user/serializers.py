from rest_framework import serializers
from user.models import User


class UserRegisterFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']


class ForgotPasswordFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']
        
        
class SetNewPasswordFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password']
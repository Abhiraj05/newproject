from rest_framework import serializers
from user.models import UserForm


class UserRegisterFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserForm
        fields = ['email', 'password']


class ForgotPasswordFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserForm
        fields = ['email']
        
        
class SetNewPasswordFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserForm
        fields = ['password']
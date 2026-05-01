from rest_framework import serializers
from user.models import UserForm


class UserRegisterFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserForm
        fields = ['email', 'password']

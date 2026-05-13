from rest_framework import serializers
from user.models import User


class UserRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = ['email', 'password']

        extra_kwargs = {
            'password': {'write_only': True}
        }
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class ForgotPasswordSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = ['email']


class SetNewPasswordSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = ['password']

        extra_kwargs = {
            'password': {'write_only': True}
        }

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "name",
            "email",
            "gender",
            "dob",
            "role",
            "phone_no",
            "address",
        ]
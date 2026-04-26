from django.shortcuts import render
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from user.serializers import UserRegisterFormSerializer

# Create your views here.

# registers the new user
class UserRegistration(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):

        if UserRegisterFormSerializer.is_valid(data=request.data):
            email = request.data('email')
            password = request.data('password')

            if User(username=email, email=email):
                return Response({"message": "user already exist !"}, status=status.HTTP_400_BAD_REQUEST)

            else:
                user_obj = User.objects.create(username=email, email=email)
                user_obj.set_password(password)
                user_obj.save()
                return Response({"message": "user register successfully !"}, status=status.HTTP_201_CREATED)

        return Response({"message": "form submission failed !"}, status=status.HTTP_400_BAD_REQUEST)


# authenticate & logins the user
class UserLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):

        if UserRegisterFormSerializer.is_valid(data=request.data):
            email = request.data('email')
            password = request.data('password')

            try:
                is_exist = User.object.get(username=email)

                if not is_exist:
                    return Response({"message": "user not found !"}, status=status.HTTP_400_BAD_REQUEST)

                is_authenticated = authenticate(
                    username=email, password=password)

                if is_authenticated is not None:
                    try:
                        token = RefreshToken.for_user(is_authenticated)
                        Response(
                            {
                                "message": "login successful !",
                                "access": str(token.access_token),
                                "refresh": str(token)
                            }
                        )
                    except:
                        return Response({"message": "login failed !"}, status=status.HTTP_400_BAD_REQUEST)
                return Response({"message": "invalid credentials !"}, status=status.HTTP_400_BAD_REQUEST)

            except:
                return Response({"message": "form submission failed !"}, status=status.HTTP_400_BAD_REQUEST)

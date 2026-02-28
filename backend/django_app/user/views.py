from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSignup
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth import authenticate
# Create your views here.

class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSignup(data=request.data)

        if serializer.is_valid():
            name = request.data.get('name')
            user_email = request.data.get('user_email')
            password = request.data.get('password')

            if User.objects.filter(email=user_email).exists():
                return Response({'message': 'email id already registered'},
                    status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.create(
                name = name ,
                user_email = user_email)
                 
            user.set_password(password)
            user.save()

            return Response(
                {'message': 'form submitted successfully'},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = []

    def post(self , request):
        user_email = request.data.get('user_email')
        password = request.data.get('password')

        user = authenticate(request , user_email = user_email, password = password)

        if user is None:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        refresh = RefreshToken.for_user(user)
        return Response({'message': 'user logged in successfully',
                        'access': str(refresh.access_token),
                        'refresh': str(refresh)
                    }, status=status.HTTP_200_OK)



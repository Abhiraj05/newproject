from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny , IsAuthenticated
from user.models import User
from rest_framework.response import Response
# Create your views here.

class FetchLawyers(APIView):
    permission_classes = [AllowAny]

    def get(self,request):
        lawyers = User.objects.filter(role='lawyer')
        return Response(lawyers.values())
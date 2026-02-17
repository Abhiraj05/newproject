from django.shortcuts import render
import requests
from django.http import JsonResponse
# Create your views here.
def get_data(request):
    response=requests.get("http://127.0.0.1:8001/get_message")
    return JsonResponse(response.json(),safe=False)
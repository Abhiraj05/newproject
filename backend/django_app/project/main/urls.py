from django.urls import path
from main.views import ExtractFileText

urlpatterns = [
    path('extract_text/',ExtractFileText.as_view(),name="extract_text")]

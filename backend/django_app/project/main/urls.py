from django.urls import path
from main.views import ExtractFileText
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    path('extract_text/',ExtractFileText.as_view(),name="extract_text")]

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
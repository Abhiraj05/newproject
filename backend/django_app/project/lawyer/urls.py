from django.urls import path
from lawyer.views import FetchLawyers

urlpatterns = [
    path('get_lawyers/',FetchLawyers.as_view(),name="user_input")
]

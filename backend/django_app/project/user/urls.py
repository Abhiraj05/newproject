from django.urls import path
from user.views import UserRegistration,UserLogin

urlpatterns = [
    path('register/',UserRegistration.as_view(),name="user_registration"),
    path('login/',UserLogin.as_view(),name="user_login")
]

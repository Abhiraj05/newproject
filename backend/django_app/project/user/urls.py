from django.urls import path
from user.views import UserRegistration,UserLogin,ForgotPassword,SetNewPassword

urlpatterns = [
    path('register/',UserRegistration.as_view(),name="user_registration"),
    path('login/',UserLogin.as_view(),name="user_login"),
    path('forgot_password/',ForgotPassword.as_view(),name="forgot_password"),
    path('reset_password/',SetNewPassword.as_view(),name="reset_password")
]

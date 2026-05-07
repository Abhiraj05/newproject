from django.shortcuts import render
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from user.serializers import UserRegisterFormSerializer
from common.email import send_email
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator

# Create your views here.

# registers the new user
class UserRegistration(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, format=None):
        serializer = UserRegisterFormSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

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
        serializer = UserRegisterFormSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
    
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


# generates the reset link email & sends it to user
class ForgotPassword(APIView):
    permission_classes = [AllowAny]
    
    def post(request):
        reset_email = request.data.get("email")
        user = User.objects.filter(email=reset_email).first()
        if not user:
            return Response({"message": "user not found!"}, status=status.HTTP_404_NOT_FOUND)

        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        default_email = "support@legalnext.com"
        mail_sub = "Password Reset Link"

        message = f"""
        Hello,

        You requested a password reset for your account. Click on the link below to set a new password:

        http://localhost:5173/setnewpassword/?uid={uid}&token={token}

        If you did not request this, please ignore this email.

        Best regards,
        legalnext Support Team
        """

        try:
            send_email(request, default_email, reset_email, message, mail_sub)
        except Exception as e:
            print(f"Reset email failed: {str(e)}")

        return Response({"message": "Reset link generated and sent to your email."})


# sets the new password in database
class SetNewPassword(APIView):
    def post(request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        if not uid or not token or not new_password:
            return Response({"message": "uid, token and new_password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(id=user_id)
        except:
            return Response({"message": "invalid uid"}, status=status.HTTP_400_BAD_REQUEST)

        if PasswordResetTokenGenerator().check_token(user, token):
            user.set_password(new_password)
            user.save()

            default_email = "support@legalnext.com"
            mail_sub = "Your Password Has Been Changed"
            confirm_message = f"""
            Hello {user.username},

            This is a confirmation that the password for your account has been successfully changed.

            If you did not perform this action, please contact our support team immediately.

            Best regards,
            legalnext Support Team
            """
            try:
                send_email(request, default_email, user.email,
                        confirm_message, mail_sub)
            except Exception as e:
                print(f"Confirmation email failed: {str(e)}")

            return Response({"message": "password reset successfully."})
        else:
            return Response({"message": "Invalid or expired token.."}, status=status.HTTP_400_BAD_REQUEST)

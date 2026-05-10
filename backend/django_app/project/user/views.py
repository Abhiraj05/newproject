from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny , IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from common.email import send_email
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from user.serializers import UserProfileSerializer,ForgotPasswordSerializer,SetNewPasswordSerializer


# Create your views here.

# registers the new user
class UserRegistration(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserProfileSerializer(data=request.data)
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
        serializer = UserProfileSerializer(data=request.data)
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

    def post(self, request, format=None):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            reset_email = request.data.get("email")
            try:
                user = User.objects.filter(email=reset_email).first()
                if not user:
                    return Response({"message": "user not found !"}, status=status.HTTP_404_NOT_FOUND)

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
                    send_email(request, default_email,
                               reset_email, message, mail_sub)
                except Exception as e:
                    print(f"Reset email failed: {str(e)}")

                return Response({"message": "reset link generated and sent to your email !"})
            except:
                return Response({"message": "invalid email id !"}, status=status.HTTP_404_NOT_FOUND)


# sets the new password in database
class SetNewPassword(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = SetNewPasswordSerializer(data=request.data)
        if serializer.is_valid():
            uid = request.data.get('uid')
            token = request.data.get('token')
            new_password = request.data.get('password')

            try:
                if not uid or not token or not new_password:
                    return Response({"message": "uid, token and new password are required !"}, status=status.HTTP_400_BAD_REQUEST)

                try:
                    user_id = urlsafe_base64_decode(uid).decode()
                    user = User.objects.get(id=user_id)
                except:
                    return Response({"message": "invalid uid !"}, status=status.HTTP_400_BAD_REQUEST)

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
                        print(f"confirmation email failed: {str(e)}")

                    return Response({"message": "password reset successfully !"}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "invalid or expired token !"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"message": "invalid password !"}, status=status.HTTP_400_BAD_REQUEST)


class EditProfile(APIView):
    permission_classes = [IsAuthenticated]

    def post(self , request, format=None):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            dob = serializer.validated_data['dob']
            address = serializer.validated_data['address']
            phone_no = serializer.validated_data['phone_no']
            gender = serializer.validated_data['gender']

            user = request.user
            if User.objects.filter(user).exists():
                user.name = name
                user.dob = dob
                user.address = address
                user.phone_no = phone_no
                user.gender = gender

                user.save()
                return Response({
                "message": "Profile updated successfully"
            })

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
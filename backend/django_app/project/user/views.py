from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from user.models import User
from lawyer.models import LawyerProfile
from rest_framework_simplejwt.tokens import RefreshToken
from common.email import send_email
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from user.serializers import UserProfileSerializer, ForgotPasswordSerializer, SetNewPasswordSerializer, UserRegisterSerializer, UserLoginSerializer


# Create your views here.

# registers the new user
class UserRegistration(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            if User.objects.filter(email=email).exists():
                return Response({"message": "user already exist !"}, status=status.HTTP_400_BAD_REQUEST)

            else:
                user_obj = User.objects.create(username=email, email=email)
                user_obj.set_password(password)
                user_obj.save()
                return Response({"message": "user register successfully !"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "form submission failed !"}, status=status.HTTP_400_BAD_REQUEST)


# authenticate & logins the user
class UserLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            try:
                is_exist = User.objects.get(email=email)

                if not is_exist:
                    return Response({"message": "user not found !"}, status=status.HTTP_400_BAD_REQUEST)

                is_authenticated = authenticate(
                    username=email, password=password)

                if is_authenticated is not None:
                    try:
                        token = RefreshToken.for_user(is_authenticated)
                        return Response(
                            {
                                "message": "login successful !",
                                "access": str(token.access_token),
                                "refresh": str(token),
                                "username": is_exist.email
                            }
                        )
                    except:
                        return Response({"message": "login failed !"}, status=status.HTTP_400_BAD_REQUEST)
                return Response({"message": "invalid credentials !"}, status=status.HTTP_400_BAD_REQUEST)

            except:
                return Response({"message": "form submission failed !"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

                return Response({"message": "reset link generated and sent to your email !"}, status=status.HTTP_201_CREATED)
            except:
                return Response({"message": "invalid email id !"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# updates the user profile
class EditProfile(APIView):
    permission_classes = [IsAuthenticated]

    # fetches user profile details
    def get(self, request, format=None):
        try:
            is_user = User.objects.filter(id=request.user.id).first()
            is_lawyer = LawyerProfile.objects.filter(
                user_id=request.user.id).first()

            if not is_user:
                return Response({"message": "profile not found !"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                if is_user and is_lawyer:
                    return Response({"user_data": {
                        "name": is_user.name,
                        "email": is_user.email,
                        "gender": is_user.gender,
                        "dob": is_user.dob,
                        "role": is_user.role,
                        "phone_no": is_user.phone_no,
                        "address": is_user.address,
                        "speciality": is_lawyer.speciality,
                        "experience": is_lawyer.experience,
                        "fees": is_lawyer.fees
                    }}, status=status.HTTP_200_OK)
                else:
                    return Response({"user_data": {
                        "name": is_user.name,
                        "email": is_user.email,
                        "gender": is_user.gender,
                        "dob": is_user.dob,
                        "role": is_user.role,
                        "phone_no": is_user.phone_no,
                        "address": is_user.address
                    }}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "failed to extract profile !"}, status=status.HTTP_400_BAD_REQUEST)

    # updates the user profile details
    def put(self, request, format=None):
        serializer = UserProfileSerializer(
            request.user, data=request.data, partial=True)

        if serializer.is_valid():
            name = serializer.validated_data['name']
            email = serializer.validated_data['email']
            gender = serializer.validated_data['gender']
            dob = serializer.validated_data['dob']
            role = serializer.validated_data['role']
            phone_no = serializer.validated_data['phone_no']
            address = serializer.validated_data['address']
            speciality = request.data.get("speciality")
            experience = request.data.get("experience")
            fees = request.data.get("fees")

            try:
                is_user = User.objects.filter(id=request.user.id).first()

                if not is_user:
                    return Response({"message": "profile not found !"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    is_user.name = name
                    is_user.email = email
                    is_user.gender = gender
                    is_user.dob = dob
                    is_user.role = role
                    is_user.phone_no = phone_no
                    is_user.address = address
                    is_user.save()


                if  speciality is not None and fees is not None and experience is not None:
                    is_lawyer = LawyerProfile.objects.filter(
                        user=request.user).first()

                    if is_lawyer is None:
                        LawyerProfile.objects.create(
                            user=is_user, fees=fees, speciality=speciality, experience=experience)
                    else:
                        is_lawyer.speciality = speciality
                        is_lawyer.experience = experience
                        is_lawyer.fees = fees
                        is_lawyer.save()

                return Response({"message": "profile updated successfully !"}, status=status.HTTP_200_OK)
            except:
                return Response({"message": "profile updatedation failed !"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

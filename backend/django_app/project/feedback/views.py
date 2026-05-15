from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from common.email import send_email

# Create your views here.

# sends the feedback email to the admin
class UserFeedback(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, format=None):
        user_name = request.data.get("name")
        user_email = request.data.get("email")
        user_message = request.data.get("message")
        default_email = "support@legalnext.com"
        mail_sub = f"New Feedback Submitted by {user_name}"
        message = f"""
        You have received new feedback from a user.

        User Details:

        Name: {user_name}

        Email: {user_email}

        Message: {user_message}

        Please review the feedback and respond to the user if required.

        legalnext Support Team System Notification
        """
        try:
            send_email(request, user_email, default_email, message, mail_sub)
            return Response({"message": "feedback form submitted via email."},status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Reset email failed: {str(e)}")
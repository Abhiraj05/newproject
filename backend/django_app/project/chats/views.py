import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from chats.serializers import UserInputSerializer
from lawyer.models import LawyerProfile
from chats.models import BotChats, Conversations

# Create your views here.

# send user query request to fastapi server and creates new converstion for each user query
class ChatBoxForm(APIView):
    permission_classes = [IsAuthenticated]

    # send user query request fastapi server and returns response by bot
    def chatbot(self, query):
        try:
            model_response = requests.post("http://127.0.0.1:8001/user_query",
                                           json={"query_text": query})

            print(model_response.json())

            if not model_response:
                return Response({"message": "request to model failed !"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return model_response.json()
        except:
            return Response({"message": "invalid query type !"}, status=status.HTTP_400_BAD_REQUEST)


    # creates new converstion for each user query and bot response
    def post(self, request, format=None):
        serializer = UserInputSerializer(data=request.data)

        if serializer.is_valid():
            user_query = serializer.validated_data['sender']

            try:
                model_response = self.chatbot(user_query)
                print(model_response)
                if not model_response:
                    return Response({"message": "no response from bot !"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    # user_obj = User.objects.filter(
                    #     id=request.user.id).first()

                    # if not user_obj:
                    #     return Response({"message": "user not found !"}, status=status.HTTP_400_BAD_REQUEST)

                    user_profile = User.objects.filter(
                        user=request.user.id).first()

                    lawyer_profile = LawyerProfile.objects.filter(
                        user=request.user.id).first()

                    if not user_profile and not lawyer_profile:
                        return Response({"message": "user not found !"}, status=status.HTTP_400_BAD_REQUEST)

                    profile = user_profile if user_profile else lawyer_profile

                    conversation_obj = Conversations.objects.create(
                        user=profile)

                    bot_chat = BotChats.objects.create(
                        conversation_id=conversation_obj, sender=user_query, bot=model_response["response"])

                    return Response({"message": "conversation created !",
                                    "conversation_id": conversation_obj.id,
                                    "bot_id": bot_chat.id,
                                    "user_query": user_query,
                                    "bot_response": model_response[0]["text"]
                                    }, status=status.HTTP_201_CREATED)

            except:
                return Response({"message": "no response from bot !"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # fetches user conversations
    def get(self, request, format=None):
        conversation_id = request.data.get("conversation_id")
        try:
            conversation_list = BotChats.objects.filter(
                conversation_id=conversation_id).values("sender", "bot", "created_at").all()
            if not conversation_list:
                return Response({"message": "conversation not found !"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"conversation_list": conversation_list}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "failed to extract conversation !"}, status=status.HTTP_400_BAD_REQUEST)

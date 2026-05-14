import os
import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from chats.serializers import UserInputSerializer
from chats.models import BotChats, Conversations
from extractor.models import Files
from lawyer.models import LawyerProfile


# Create your views here.

# send user query request to fastapi server and creates new converstion for each user query
class ChatBoxForm(APIView):
    permission_classes = [IsAuthenticated]

    # send user query request to fastapi server and returns response by bot
    def chatbot(self, query,file_obj_id):
         
        try:
            lawyers_list = list(LawyerProfile.objects.select_related("user").values(
                "user__name",
                "user__email",
                "user__gender",
                "user__phone_no",
                "user__address",
                "speciality",
                "experience",
                "fees"
            ).order_by("-id"))
          
            model_response = requests.post("http://127.0.0.1:8001/user_query",
                                           json={"query_text": query,"file_id":file_obj_id,"lawyers_list":lawyers_list})

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
            conversation_id = request.data.get('conversation_id')
            
            if not conversation_id:
                file_obj_id = request.data.get('file_obj_id')
            else:
                file_obj=Files.objects.filter(conversation=conversation_id).first()
                file_obj_id=file_obj.id
         
            try:
                model_response = self.chatbot(user_query,file_obj_id)
            
                if not model_response:
                    return Response({"message": "no response from bot !"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    if Conversations.objects.filter(id=conversation_id).exists():
                        pass
                    else:
                        file_obj=Files.objects.filter(id=file_obj_id).first()
                        
                        conversation_obj = Conversations.objects.create(
                            user=request.user,document=os.path.basename(file_obj.file.name))
                        
                        file_obj.conversation=conversation_obj
                        file_obj.save()
                        
                    if conversation_id is None:
                        previous_conversation_id=conversation_obj
                    else:
                        previous_conversation_obj=Conversations.objects.filter(id=conversation_id).first()
                        previous_conversation_id=previous_conversation_obj
              
                    bot_chat = BotChats.objects.create(
                            conversation=previous_conversation_id, sender=user_query, bot=model_response[0]["text"])
       
                    return Response({"message": "conversation created !",
                                    "conversation_id": previous_conversation_id.id,
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
        conversation_id = request.GET.get("conversation_id")
        file=Files.objects.filter(conversation=conversation_id).values("file").first()
        
        try:
            conversation_list = BotChats.objects.filter(
                conversation_id=conversation_id).values("sender", "bot", "created_at").all().order_by("created_at")
            if not conversation_list:
                return Response({"message": "conversation not found !"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"conversation_list": conversation_list,"file_name":file}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "failed to extract conversation !"}, status=status.HTTP_400_BAD_REQUEST)



# fetches all conversations of user and sends it to frontend
class GetAllChatConversations(APIView):
    
    # fetches all conversations of user 
    def get(self, request, format=None): 
        try:
            all_conversation_list = Conversations.objects.filter(
                    user_id=request.user).values("id","document", "created_at").all().order_by("-id")
        
            if not all_conversation_list:
                return Response({"message": "conversations not found !"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"all_conversation_list": all_conversation_list}, status=status.HTTP_200_OK)
        except:
                return Response({"message": "failed to extract conversations !"}, status=status.HTTP_400_BAD_REQUEST)


        

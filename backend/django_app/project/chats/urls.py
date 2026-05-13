from django.urls import path
from chats.views import ChatBoxForm,GetAllChatConversations

urlpatterns = [
    path('user_input/',ChatBoxForm.as_view(),name="user_input"),
    path('get_chats/',ChatBoxForm.as_view(),name="get_chats"),
    path('get_conversations/',GetAllChatConversations.as_view(),name="get_conversations")
]

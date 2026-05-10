from django.urls import path
from chats.views import ChatBoxForm

urlpatterns = [
    path('user_input/',ChatBoxForm.as_view(),name="user_input"),
    path('get_chats/',ChatBoxForm.as_view(),name="get_chats"),
]

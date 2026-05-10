from rest_framework import serializers
from chats.models import BotChats


class UserInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotChats
        fields = ['sender']


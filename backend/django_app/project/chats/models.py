from django.db import models
from user.models import User

# Create your models here.

# conversations model
class Conversations(models.Model):
    user = models.ForeignKey( User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()

# chats model
class BotChats(models.Model):
    conversation = models.ForeignKey(Conversations , on_delete=models.CASCADE)
    sender = models.CharField()
    bot = models.CharField()
    created_at = models.DateTimeField()
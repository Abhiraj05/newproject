from django.db import models
from user.models import User

# Create your models here.

# conversations model
class Conversations(models.Model):
    user = models.ForeignKey( User, on_delete=models.CASCADE)
    document = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

# chats model
class BotChats(models.Model):
    conversation = models.ForeignKey(Conversations , on_delete=models.CASCADE)
    sender = models.TextField()
    bot = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
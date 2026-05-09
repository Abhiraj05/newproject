from django.db import models
from user.models import User
# Create your models here.
class Conversations(models.Model):
    user_id = models.ForeignKey( User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()

class BotChats(models.Model):
    class Sender_Type(models.TextChoices):
        HUMAN = 'Human'
        BOT = 'Bot'
    conversation_id = models.ForeignKey(Conversations , on_delete=models.CASCADE)
    sender = models.CharField(choices=Sender_Type.choices , default=Sender_Type.HUMAN)
    message = models.JSONField()
    created_at = models.DateTimeField()
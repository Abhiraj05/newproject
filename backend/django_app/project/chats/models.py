from django.db import models
from user.models import User

# Create your models here.
class Conversations(models.Model):
    user = models.ForeignKey( User, on_delete=models.CASCADE)
    created_at = models.DateTimeField()

class BotChats(models.Model):
    conversation = models.ForeignKey(Conversations , on_delete=models.CASCADE)
    sender = models.CharField()
    bot = models.JSONField()
    created_at = models.DateTimeField()
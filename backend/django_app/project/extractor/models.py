from django.db import models
from user.models import User
from chats.models import Conversations

# Create your models here.

# file model
class Files(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    conversation = models.ForeignKey(
        Conversations,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    file = models.FileField(upload_to="uploads/")
    created_at = models.DateTimeField(auto_now_add=True)
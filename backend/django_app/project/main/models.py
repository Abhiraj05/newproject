from django.db import models
from user.models import UserForm

# Create your models here.
class Document(models.Model):
    user=models.ForeignKey(UserForm)
    file=models.FileField(("/"), upload_to=None, max_length=100)
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class userprofile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100 , null=False, blank=False)
    user_email = models.EmailField(max_length=30, unique=True, null=False,  blank=False)
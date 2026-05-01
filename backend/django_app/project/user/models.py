from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Gender(models.TextChoices):
    MALE = "male"
    FEMALE = "female"


class UserForm(User):
    name = models.CharField(max_length=30, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=Gender.choices)
    phone_no = models.CharField(max_length=10, null=True, blank=True)
    fees = models.CharField(null=True, blank=True)
    address = models.CharField(null=True, blank=True)

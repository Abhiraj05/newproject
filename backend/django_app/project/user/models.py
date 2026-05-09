from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Gender(models.TextChoices):
    MALE = "male" , "Male"
    FEMALE = "female" , "Female"


class User(AbstractUser):
    class Role(models.TextChoices):
        USER = "User", User
        LAWYER = "Lawyer"
    name = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=10, choices=Gender.choices)
    dob = models.DateField()
    role = models.CharField(max_length=10, choices=Role.choices)
    phone_no = models.CharField(max_length=10, null=True, blank=True)
    address = models.CharField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []





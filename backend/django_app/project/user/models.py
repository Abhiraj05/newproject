from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# gender choices
class Gender(models.TextChoices):
    MALE = "male" , "Male"
    FEMALE = "female" , "Female"

# user model
class User(AbstractUser):
    class Role(models.TextChoices):
        USER = "user", "User"
        LAWYER = "lawyer", "Lawyer"
    name = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=10, choices=Gender.choices,null=True, blank=True)
    dob = models.DateField(null=True,blank=True)
    role = models.CharField(max_length=10, choices=Role.choices)
    phone_no = models.CharField(max_length=10, null=True, blank=True)
    address = models.CharField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []





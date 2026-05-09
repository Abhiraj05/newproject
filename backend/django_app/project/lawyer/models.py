from django.db import models
from user.models import User, Gender
# Create your models here.

class LawyerProfile(User):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="lawyer_profile")
    name = models.CharField(max_length=30, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=Gender.choices)
    dob = models.DateField()
    phone_no = models.CharField(max_length=10, null=True, blank=True)
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(null=True, blank=True)
    experience = models.PositiveIntegerField()
    speciality = models.CharField(max_length=50)
from django.db import models
from user.models import User

# Create your models here.

# lawyer profile model
class LawyerProfile(User):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="lawyer_profile")
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    experience = models.PositiveIntegerField()
    speciality = models.CharField(max_length=50)
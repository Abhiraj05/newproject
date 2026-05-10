from django.db import models
from user.models import User

# Create your models here.
class Files(models.Model):
    user_id = models.ForeignKey(User , on_delete=models.CASCADE)
    file_name = models.FileField(upload_to="uploads/")
    created_at = models.DateField()
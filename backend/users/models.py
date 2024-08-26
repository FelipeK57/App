from django.db import models
from django.contrib.auth.models import User
from Tasks_List.models import List

# Create your models here.
class Users(models.Model):
    name = models.CharField(max_length=200, null=True)
    listas = models.ManyToManyField(List)

    def __str__(self):
        return self.name
from django.db import models
from tasks.models import Task
# Create your models here.

class List(models.Model):
    name = models.CharField(max_length=200)
    emoji = models.CharField(max_length=200, null=True)
    tasks = models.ManyToManyField(Task, null=True)

    def __str__(self):
        return self.name

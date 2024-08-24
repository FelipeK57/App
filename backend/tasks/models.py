from django.db import models
from django.utils import timezone

# Create your models here.
class Task(models.Model):
    tittle = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.tittle
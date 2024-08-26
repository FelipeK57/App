from django.db import models
from django.utils import timezone, dateformat

# Create your models here.
class Task(models.Model):
    tittle = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    completed = models.BooleanField(default=False)

    def __str__(self):
        # Formato de la fecha: día/mes/año hora:minuto
        formatted_date = dateformat.format(self.date, 'd/m/Y H:i')
        return f"{self.tittle} - {formatted_date}"

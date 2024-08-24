from rest_framework import serializers
from .models import List
from tasks.serializer import TaskSerializer

class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)
    class Meta:
        model = List
        fields = '__all__'
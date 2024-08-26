from rest_framework import serializers
from .models import Users
from Tasks_List.serializer import ListSerializer

class UserSerializer(serializers.ModelSerializer):

    listas = ListSerializer(many=True)
    class Meta:
        model = Users
        fields = '__all__'

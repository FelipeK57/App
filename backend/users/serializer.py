from rest_framework import serializers
from .models import User
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class UserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = User
        fields = '__all__'

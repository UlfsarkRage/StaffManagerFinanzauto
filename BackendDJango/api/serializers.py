from rest_framework import serializers
from .models import User

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'title', 'firstName', 'lastName', 'picture')

class UserDetailSerializer(serializers.ModelSerializer):
    location = serializers.JSONField(required=False)

    class Meta:
        model = User
        fields = (
            'id', 'title', 'firstName', 'lastName', 'picture', 'document', 'gender', 'email',
            'dateOfBirth', 'phone', 'location', 'registerDate', 'updatedDate'
        )
from rest_framework import viewsets, permissions
from .models import User
from .serializers import UserListSerializer, UserDetailSerializer
from .pagination import UserResultsPagination

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-registerDate')
    permission_classes = [permissions.AllowAny]
    pagination_class = UserResultsPagination

    def get_serializer_class(self):
        if self.action == "list":
            return UserListSerializer
        return UserDetailSerializer
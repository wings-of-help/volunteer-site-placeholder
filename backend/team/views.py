from rest_framework.viewsets import ModelViewSet

from main.permissions import IsAdminOrReadOnly
from team.models import Teammate
from team.serializers import TeammateSerializer


class TeammateViewSet(ModelViewSet):
    queryset = Teammate.objects.all().prefetch_related("social_links")
    serializer_class = TeammateSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

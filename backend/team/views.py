from rest_framework.viewsets import ModelViewSet

from main.permissions import IsAdminOrReadOnly
from team.models import Teammate
from team.serializers import TeammateSerializer

from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
)


@extend_schema_view(
    list=extend_schema(
        summary="List all teammates",
        tags=["Teammates"],
    ),
    retrieve=extend_schema(
        summary="Retrieve a teammate",
        tags=["Teammates"],
    ),
    create=extend_schema(
        summary="Create a teammate (admin only)",
        tags=["Teammates"],
    ),
    update=extend_schema(
        summary="Update a teammate (PUT, admin only)",
        tags=["Teammates"],
    ),
    partial_update=extend_schema(
        summary="Partially update a teammate (PATCH, admin only)",
        description="Update one or more fields of a teammate",
        tags=["Teammates"],
    ),
    destroy=extend_schema(
        summary="Delete a teammate (admin only)",
        tags=["Teammates"],
    ),
)
class TeammateViewSet(ModelViewSet):
    queryset = Teammate.objects.all().prefetch_related("social_links")
    serializer_class = TeammateSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

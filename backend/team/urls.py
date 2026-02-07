from django.urls import path, include
from rest_framework.routers import DefaultRouter

from team.views import TeammateViewSet

router = DefaultRouter()
router.register("teammates", TeammateViewSet)


urlpatterns = [
    path("", include(router.urls)),
]

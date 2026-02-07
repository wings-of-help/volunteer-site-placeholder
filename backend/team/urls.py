from django.urls import include, path
from rest_framework.routers import DefaultRouter

from team.views import TeammateViewSet

router = DefaultRouter()
router.register("teammates", TeammateViewSet)


urlpatterns = [
    path("", include(router.urls)),
]

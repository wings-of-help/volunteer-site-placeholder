from django.urls import include, path
from rest_framework import routers

from .views import CityViewSet, HelpCategoryViewSet, HelpViewSet, ping

router = routers.DefaultRouter()
router.register('help-category', HelpCategoryViewSet)
router.register('help', HelpViewSet)
router.register('city', CityViewSet)

urlpatterns = [
    path("ping/", ping),
    path("", include(router.urls)),
]
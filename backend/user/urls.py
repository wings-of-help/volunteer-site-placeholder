from django.urls import include, path
from rest_framework.routers import DefaultRouter

from user.views import UserViewSet, confirm_password_reset, request_password_reset

from .views import RegisterView

router = DefaultRouter()
router.register("user", UserViewSet)

urlpatterns = [
    path("user/register/", RegisterView.as_view(), name="register"),
    path("user/password-reset/request/", request_password_reset, name="password_reset_request"),
    path("user/password-reset/confirm/", confirm_password_reset),
    path("", include(router.urls)),
]
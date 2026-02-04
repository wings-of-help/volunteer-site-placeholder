from django.urls import include, path
from rest_framework.routers import DefaultRouter

from user.views import (
    AdminRegisterView,
    CheckEmailAvailabilityView,
    CheckPhoneNumberAvailabilityView,
    LogoutView,
    UserViewSet,
    confirm_password_reset,
    request_password_reset,
)

from .views import RegisterView

router = DefaultRouter()
router.register("user", UserViewSet)

urlpatterns = [
    path("user/register/", RegisterView.as_view(), name="register"),
    path("user/password-reset/request/", request_password_reset, name="password_reset_request"),
    path("user/password-reset/confirm/", confirm_password_reset),
    path("user/register/admin/",AdminRegisterView.as_view() , name="admin-register"),
    path("user/check-email-availability/", CheckEmailAvailabilityView.as_view(), name="check_email_availability"),
    path(
        "user/check-phone-number-availability/",
        CheckPhoneNumberAvailabilityView.as_view(),
        name="check_phone_number_availability"
    ),
    path("user/logout/", LogoutView.as_view(), name="logout"),
    path("", include(router.urls)),
]
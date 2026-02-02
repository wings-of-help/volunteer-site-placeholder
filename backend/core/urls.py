from debug_toolbar.toolbar import debug_toolbar_urls
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework_simplejwt.views import TokenRefreshView

from user.views import CustomTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    # OpenAPI schema
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Swagger UI
    path(
        'api/v1/swagger/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui',
    ),

    # Redoc UI
    path(
        'api/v1/redoc/',
        SpectacularRedocView.as_view(url_name='schema'),
        name='redoc',
    ),
    path("api/v1/user/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/user/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/v1/", include("main.urls")),
    path("api/v1/", include("user.urls")),
] + debug_toolbar_urls()

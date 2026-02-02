from datetime import timedelta

from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.utils import timezone
from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiResponse,
    extend_schema,
)
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import PasswordResetCode, User
from .permissions import UserAccessPermission
from .serializers import (
    AdminRegisterSerializer,
    CustomTokenObtainPairSerializer,
    EmailAvailabilitySerializer,
    LogoutSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    PhoneNumberAvailabilitySerializer,
    RegisterSerializer,
    UserRetrieveSerializer,
)
from .utils import generate_reset_code


class CustomTokenRefreshView(TokenRefreshView):

    @extend_schema(
        summary="Refresh JWT tokens",
        description="Get a new access token using a refresh token.",
        request={
            "refresh": "jwt_refresh_token"
        },
        responses={
            200: OpenApiResponse(
                description="Tokens refreshed",
                examples=[
                    OpenApiExample(
                        "Success",
                        value={
                            "access": "new_jwt_access_token"
                        }
                    )
                ]
            ),
            401: OpenApiResponse(description="Invalid refresh token"),
        },
        tags=["Auth"],
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    @extend_schema(
        summary="Login user",
        description="Authenticate user and return JWT access and refresh tokens.",
        request=CustomTokenObtainPairSerializer,
        responses={
            200: OpenApiResponse(
                description="JWT tokens returned",
                examples=[
                    OpenApiExample(
                        "Success",
                        value={
                            "refresh": "jwt_refresh_token",
                            "access": "jwt_access_token",
                        },
                    )
                ],
            ),
            401: OpenApiResponse(description="Invalid credentials"),
        },
        tags=["Auth"],
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)



class RegisterView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Register user",
        description="Register a new non-admin user.",
        request=RegisterSerializer,
        responses={
            201: OpenApiResponse(
                description="User registered successfully",
                examples=[
                    OpenApiExample(
                        "Success",
                        value={
                            "message": "User registered successfully",
                            "id": 1,
                            "email": "user@example.com",
                            "role": "volunteer",
                        },
                    )
                ],
            ),
            400: OpenApiResponse(description="Validation error"),
        },
        tags=["Auth"],
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "message": "User registered successfully",
                "id": user.id,
                "email": user.email,
                "role": user.role,
            },
            status=status.HTTP_201_CREATED,
        )

class AdminRegisterView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = AdminRegisterSerializer

    @extend_schema(
        summary="Register admin user",
        description="Register an admin user using a secret admin code.",
        request=AdminRegisterSerializer,
        responses={
            201: OpenApiResponse(
                description="Admin created successfully",
                examples=[
                    OpenApiExample(
                        "Success",
                        value={
                            "message": "Admin user created successfully",
                            "id": 1,
                            "email": "admin@example.com",
                            "role": "admin",
                        },
                    )
                ],
            ),
            400: OpenApiResponse(description="Invalid secret code or validation error"),
        },
        tags=["Admin"],
    )
    def post(self, request):
        serializer = AdminRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "message": "Admin user created successfully",
                "id": user.id,
                "email": user.email,
                "role": user.role,
            },
            status=status.HTTP_201_CREATED,
        )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [UserAccessPermission]
    serializer_class = UserRetrieveSerializer

    @extend_schema(
        summary="Create user (disabled)",
        description="This endpoint is disabled. Use /auth/register instead.",
        responses={
            405: OpenApiResponse(description="Method not allowed")
        },
        tags=["Users"],
    )
    def create(self, request, *args, **kwargs):
        return Response(
            {"detail": "Method \"POST\" not allowed."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    @extend_schema(
        summary="List users",
        description="Retrieve a list of all users. Available only to administrators.",
        responses={200: UserRetrieveSerializer(many=True)},
        tags=["Users"],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Retrieve user profile",
        description="Retrieve a user profile by ID. Available to any authenticated user.",
        responses={200: UserRetrieveSerializer},
        tags=["Users"],
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        summary="Update user profile",
        description="Update a user profile. Available to the profile owner or an administrator.",
        request=UserRetrieveSerializer,
        responses={200: UserRetrieveSerializer},
        tags=["Users"],
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Partially update user profile",
        description="Partially update a user profile. Available to the profile owner or an administrator.",
        request=UserRetrieveSerializer,
        responses={200: UserRetrieveSerializer},
        tags=["Users"],
    )
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(
        summary="Delete user profile",
        description="Delete a user profile. Available to the profile owner or an administrator.",
        responses={
            204: OpenApiResponse(description="User deleted successfully")
        },
        tags=["Users"],
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


@extend_schema(
    summary="Request password reset",
    request=PasswordResetRequestSerializer,
    responses={
        200: OpenApiResponse(
            description="Reset code sent if email exists",
            examples=[
                OpenApiExample(
                    "Success",
                    value={"detail": "If the email exists, a code was sent."},
                )
            ],
        )
    },
    tags=["Password Reset"],
)
@api_view(["POST"])
def request_password_reset(request):
    email = request.data.get("email")

    user = User.objects.filter(email=email).first()
    if user:
        PasswordResetCode.objects.filter(
            user=user,
            is_used=False
        ).update(is_used=True)

        code = generate_reset_code()

        PasswordResetCode.objects.create(
            user=user,
            code=code,
            expires_at=timezone.now() + timedelta(minutes=10)
        )

        send_mail(
            subject="Password reset code",
            message=f"Your password reset code is: {code}",
            from_email=None,
            recipient_list=[user.email],
        )

    return Response({"detail": "If the email exists, a code was sent."})


@extend_schema(
    summary="Confirm password reset",
    request=PasswordResetConfirmSerializer,
    responses={
        200: OpenApiResponse(
            description="Password changed successfully",
            examples=[
                OpenApiExample(
                    "Success",
                    value={"detail": "Password successfully changed"},
                )
            ],
        ),
        400: OpenApiResponse(description="Invalid or expired code"),
    },
    tags=["Password Reset"],
)
@api_view(["POST"])
def confirm_password_reset(request):
    email = request.data.get("email")
    code = request.data.get("code")
    new_password = request.data.get("new_password")

    user = User.objects.filter(email=email).first()
    if not user:
        raise ValidationError("Invalid code or email")

    reset_code = PasswordResetCode.objects.filter(
        user=user,
        code=code,
        is_used=False
    ).first()

    if not reset_code or reset_code.is_expired():
        raise ValidationError("Invalid or expired code")

    try:
        validate_password(new_password, user)
    except Exception as ex:
        return Response({"detail": f"{ex}"}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    reset_code.is_used = True
    reset_code.save()

    return Response({"detail": "Password successfully changed"}, status=status.HTTP_200_OK)


class CheckEmailAvailabilityView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Check email availability",
        description="Check if an email can be used for registration.",
        request=EmailAvailabilitySerializer,
        responses={
            200: OpenApiResponse(description="Email is available"),
            400: OpenApiResponse(description="Email is invalid or already registered"),
        },
        tags=["Auth"],
    )
    def post(self, request):
        serializer = EmailAvailabilitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(
            {"detail": "Email is available"},
            status=status.HTTP_200_OK,
        )


class CheckPhoneNumberAvailabilityView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        summary="Check phone number availability",
        description="Check if a phone number can be used for registration.",
        request=PhoneNumberAvailabilitySerializer,
        responses={
            200: OpenApiResponse(description="phone number is available"),
            400: OpenApiResponse(description="phone number is invalid or already registered"),
        },
        tags=["Auth"],
    )
    def post(self, request):
        serializer = PhoneNumberAvailabilitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(
            {"detail": "Phone number is available"},
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Logout user",
        description="Invalidate refresh token (logout).",
        request=LogoutSerializer,
        responses={
            205: OpenApiResponse(description="Successfully logged out"),
            400: OpenApiResponse(description="Invalid token"),
        },
        tags=["Auth"],
    )
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"detail": "Successfully logged out"},
            status=status.HTTP_205_RESET_CONTENT,
        )
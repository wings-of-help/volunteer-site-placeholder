from datetime import timedelta

from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import PasswordResetCode, User
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    UserRetrieveSerializer,
)
from .utils import generate_reset_code


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = UserRetrieveSerializer


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

    validate_password(new_password, user)

    user.set_password(new_password)
    user.save()

    reset_code.is_used = True
    reset_code.save()

    return Response({"detail": "Password successfully changed"})
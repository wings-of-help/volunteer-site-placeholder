from django.conf import settings
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        try:
            self.token = RefreshToken(attrs["refresh"])
        except Exception:
            raise serializers.ValidationError("Invalid refresh token")
        return attrs

    def save(self, **kwargs):
        self.token.blacklist()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["id"] = user.id
        token["role"] = user.role
        token["email"] = user.email
        return token



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    role = serializers.ChoiceField(
        choices=[
            User.Role.DISTRESSED,
            User.Role.VOLUNTEER,
        ]
    )

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
            "role",
        ]

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        return user


class UserRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "role",
        ]
        read_only_fields = ["id", "role"]


class AdminRegisterSerializer(RegisterSerializer):
    secret_code = serializers.CharField(write_only=True, required=True)

    class Meta(RegisterSerializer.Meta):
        fields = [
            field
            for field in RegisterSerializer.Meta.fields
            if field != "role"
        ] + ["secret_code"]

    def validate_secret_code(self, value):
        if value != settings.ADMIN_SECRET_CODE:
            raise serializers.ValidationError("Invalid secret code.")
        return value

    def create(self, validated_data):
        validated_data.pop("secret_code")

        user = User.objects.create_user(
            **validated_data,
            role="admin",
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(update_fields=["is_staff", "is_superuser"])

        return user


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField()
    new_password = serializers.CharField()


class EmailAvailabilitySerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "This email is already in use."
            )
        return value


class PhoneNumberAvailabilitySerializer(serializers.Serializer):
    phone_number = serializers.CharField()

    def validate_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError(
                "This phone number is already in use."
            )
        return value
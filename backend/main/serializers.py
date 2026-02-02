from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from user.models import User
from user.serializers import UserRetrieveSerializer

from .models import City, Help, HelpCategory


class HelpCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpCategory
        fields = ['id', 'name']


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id", "name"]


class HelpListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True,
    )
    location_name = serializers.CharField(
        source="location.name",
        read_only=True,
    )

    class Meta:
        model = Help
        fields = [
            "id",
            "title",
            "location_name",
            "location",
            "description",
            "kind",
            "category",
            "category_name",
            "status",
            "creator",
            "counterpart",
            "created_at",
            "updated_at",
            "completed_at"
        ]
        read_only_fields = [
            "status",
            "creator",
            "created_at",
            "updated_at",
            "completed_at",
            "counterpart",
        ]

    def validate_kind(self, value):
        request = self.context.get("request")
        user = request.user if request else None

        if not user or not user.is_authenticated:
            return value

        role = user.role

        if role == User.Role.VOLUNTEER and value != Help.Kind.OFFER:
            raise ValidationError(
                "Volunteers can create only offers."
            )

        if role == User.Role.DISTRESSED and value != Help.Kind.REQUEST:
            raise ValidationError(
                "Distressed can create only requests."
            )

        return value


class HelpRetrieveSerializer(HelpListSerializer):

    creator_info = UserRetrieveSerializer(
        read_only=True,
        many=False,
        source="creator",
    )
    counterpart_info = UserRetrieveSerializer(
        read_only=True,
        many=False,
        source="counterpart",
    )

    class Meta:
        model = Help
        fields = [
            "id",
            "title",
            "location_name",
            "location",
            "description",
            "kind",
            "category",
            "category_name",
            "status",
            "creator",
            "creator_info",
            "counterpart",
            "counterpart_info",
            "created_at",
            "updated_at",
            "completed_at"
        ]
        read_only_fields = [
            "status",
            "creator",
            "created_at",
            "updated_at",
            "completed_at",
            "counterpart",
            "kind",
        ]

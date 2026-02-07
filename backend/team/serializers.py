from rest_framework import serializers

from team.models import SocialLink, Teammate


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = (
            "id",
            "name",
            "link"
        )


class TeammateSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many=True)

    class Meta:
        model = Teammate
        fields = (
            "id",
            "first_name",
            "last_name",
            "role",
            "email",
            "personal_website",
            "story",
            "date_of_birth",
            "photo",
            "social_links"
        )

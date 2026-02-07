from django.contrib import admin

from .models import SocialLink, Teammate


class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1


@admin.register(Teammate)
class TeammateAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "role",
        "email",
    )
    list_filter = ("role",)
    search_fields = ("first_name", "last_name", "email")
    inlines = [SocialLinkInline]


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("name", "owner", "link")
    search_fields = ("name", "owner__first_name", "owner__last_name")
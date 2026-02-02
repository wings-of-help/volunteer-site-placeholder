from django.contrib import admin

from .models import City, Help, HelpCategory


@admin.register(HelpCategory)
class HelpCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Help)
class HelpAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "kind",
        "status",
        "category",
        "creator",
        "counterpart",
        "created_at",
    )
    list_filter = ("kind", "status", "category")
    search_fields = ("title", "location", "description")
    autocomplete_fields = ("creator", "counterpart")
    readonly_fields = ("created_at", "updated_at", "completed_at")
    ordering = ("-created_at",)

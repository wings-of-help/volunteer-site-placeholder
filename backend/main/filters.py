import django_filters
from django_filters import BaseInFilter, NumberFilter, CharFilter

from .models import Help


class NumberInFilter(BaseInFilter, NumberFilter):
    pass


class CharInFilter(BaseInFilter, CharFilter):
    pass


class HelpFilter(django_filters.FilterSet):
    # multiple
    category = NumberInFilter(field_name="category_id", lookup_expr="in")
    status = CharInFilter(field_name="status", lookup_expr="in")
    location = NumberInFilter(field_name="location_id", lookup_expr="in")

    # single
    creator = NumberFilter(field_name="creator_id")
    counterpart = NumberFilter(field_name="counterpart_id")
    kind = django_filters.ChoiceFilter(choices=Help.Kind.choices)

    completed = django_filters.BooleanFilter(method="filter_completed")

    class Meta:
        model = Help
        fields = [
            "category",
            "creator",
            "counterpart",
            "status",
            "kind",
            "location",
            "completed",
        ]

    def filter_completed(self, queryset, name, value):
        if value:
            return queryset.filter(completed_at__isnull=False)
        return queryset.filter(completed_at__isnull=True)
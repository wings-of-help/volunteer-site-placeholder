import django_filters

from .models import Help


class HelpFilter(django_filters.FilterSet):
    category = django_filters.NumberFilter(field_name="category_id")
    creator = django_filters.NumberFilter(field_name="creator_id")
    counterpart = django_filters.NumberFilter(field_name="counterpart_id")

    status = django_filters.ChoiceFilter(choices=Help.Status.choices)
    kind = django_filters.ChoiceFilter(choices=Help.Kind.choices)

    completed = django_filters.BooleanFilter(
        method="filter_completed"
    )

    class Meta:
        model = Help
        fields = [
            "category",
            "creator",
            "counterpart",
            "status",
            "kind",
            "completed",
        ]

    def filter_completed(self, queryset, name, value):
        if value:
            return queryset.filter(completed_at__isnull=False)
        return queryset.filter(completed_at__isnull=True)
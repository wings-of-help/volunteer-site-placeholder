from django.conf import settings
from django.db import models


class HelpCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "help category"
        verbose_name_plural = "help categories"
        ordering = ("name",)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "city"
        verbose_name_plural = "cities"

    def __str__(self):
        return self.name


class Help(models.Model):
    class Kind(models.TextChoices):
        REQUEST = "request", "Request"
        OFFER = "offer", "Offer"

    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_PROGRESS = "in_progress", "In Progress"
        DONE = "done", "Done"

    title = models.CharField(max_length=100)
    location = models.ForeignKey(City, on_delete=models.PROTECT, default=1)
    description = models.TextField()
    kind = models.CharField(
        max_length=20,
        choices=Kind.choices,
        default=Kind.REQUEST,
    )
    category = models.ForeignKey(HelpCategory, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW,
    )
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_by",
    )
    counterpart = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="counterpart_by",
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )
    completed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = "help"
        verbose_name_plural = "helps"
        ordering = ("created_at",)

    def __str__(self):
        return f"{self.kind}, {self.location}, from: {self.created_at}"

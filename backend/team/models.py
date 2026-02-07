from django.db import models
from cloudinary.models import CloudinaryField


class Teammate(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    email = models.EmailField()
    personal_website = models.URLField(blank=True, null=True)
    story = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    photo = CloudinaryField(
        'photo', blank=True, null=True, folder='teammates'
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"


class SocialLink(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(Teammate, on_delete=models.CASCADE)
    link = models.URLField(blank=True, null=True)

from django import contrib
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Role(models.Model):
    name = models.CharField(max_length=30)
    persianName = models.CharField(max_length=25, null=True)
    description = models.CharField(max_length=255, null=True)
    hidden = models.BooleanField(default=False)
    default = models.BooleanField(default=False)
    checked = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Token(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255)

    def __str__(self) -> str:
        return '{}_token'.format(self.user)

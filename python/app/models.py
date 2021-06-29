from django import contrib
from django.db import models
from django.contrib.auth.models import User
from sort_order_field import SortOrderField
import sort_order_field
from django.contrib import admin

# Create your models here.


class Role(models.Model):
    # class meta: ordering = ['sort_order', ]
    order = models.IntegerField(default=0)

    name = models.CharField(max_length=30, unique=True)
    team = models.CharField(max_length=1, null=False,
                            choices=[('w', 'white'), ('b', 'black')],
                            default='w')
    persianName = models.CharField(max_length=30, null=True)
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

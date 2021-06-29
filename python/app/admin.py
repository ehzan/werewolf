from django.contrib import admin
from django.db.models import fields
from . import models
# Register your models here.

admin.site.register(models.Token)
# admin.site.register(models.Role)


@admin.register(models.Role)
class RoleAdmin(admin.ModelAdmin):
    # fields = ('name', 'team', 'order')
    list_display = ['team', 'name', 'hidden', 'default', 'checked', 'order', ]
    list_editable = ['order', 'hidden', 'default', 'checked']
    ordering = ['-team', 'hidden', '-default', 'order']

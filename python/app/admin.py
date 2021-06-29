from django.contrib import admin
from django.db.models import fields
from . import models
# Register your models here.

admin.site.register(models.Token)
# admin.site.register(models.Role)


@admin.register(models.Role)
class RoleAdmin(admin.ModelAdmin):
    # fields = ('name', 'team', 'order')
    def state(self, instance):
        return '{} ({}-{}-{})'.format('INNOCENT' if instance.team == 'w' else 'MAFIA',
                                      'hidden' if instance.hidden else 'visible',
                                      'primary' if instance.primary else 'secondary',
                                      'default' if instance.default else 'not default',)
    list_display = ['name', 'state', 'description', 'order', ]
    list_editable = ['order', ]
    ordering = ['-team', 'hidden', 'primary', 'order', ]

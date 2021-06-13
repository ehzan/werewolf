from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Role(models.Model):
    name=models.CharField(max_length=25)
    persianName=models.CharField(max_length=25, null=True)
    description=models.CharField(max_length=255, null=True)
    hidden=models.BooleanField(default=False)
    default=models.BooleanField(default=False)
    checked=models.BooleanField(default=False)
    def __unicode__(self):
        return "hi {}".format(self.name)
from django import contrib
from django.db import models
from django.contrib.auth.models import User

# from django.contrib import admin

# Create your models here.


class Role(models.Model):
    class meta:
        ordering = ['order', ]
    order = models.IntegerField(default=0)

    name = models.CharField(max_length=30, unique=False)
    team = models.CharField(max_length=1, null=False, default='w',
                            choices=[('w', 'white'), ('b', 'black')])
    persianName = models.CharField(max_length=30, null=True)
    description = models.CharField(max_length=255, null=True)
    hidden = models.BooleanField(default=False)
    primary = models.BooleanField(default=False)
    default = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Token(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255)

    def __str__(self) -> str:
        return '{}_token'.format(self.user)


class Game(models.Model):
    id = models.BigIntegerField("id of the game", primary_key=True)
    verbose = models.CharField("list of roles", max_length=500)
    active = models.BooleanField(default=False)

    def __str__(self):
        return 'Game#{}: {}'.format(self.id, 'active' if self.active else 'finished')


class Player(models.Model):
    number = models.IntegerField(default=1)
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    role_id = models.ForeignKey(Role, on_delete=models.CASCADE)
    state = models.CharField(max_length=5, default='alive',
                             choices=[('alive', 'alive'), ('dead', 'dead')])

    def __str__(self):
        return '{}. {} (Game{})'.format(self.number, self.role_id, self.game_id)

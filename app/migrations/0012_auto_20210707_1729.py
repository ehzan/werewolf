# Generated by Django 3.2.4 on 2021-07-07 12:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_auto_20210704_1609'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='game_id',
        ),
        migrations.RemoveField(
            model_name='player',
            name='role_id',
        ),
        migrations.DeleteModel(
            name='Game',
        ),
        migrations.DeleteModel(
            name='Player',
        ),
    ]

# Generated by Django 3.2.4 on 2021-06-29 05:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_poll_foo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='role',
            name='sort_order',
        ),
        migrations.DeleteModel(
            name='PollOption',
        ),
    ]

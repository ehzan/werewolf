# Generated by Django 3.2.4 on 2021-07-03 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20210703_1749'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='state',
            field=models.CharField(choices=[('alive', 'alive'), ('dead', 'dead')], default='alive', max_length=5),
        ),
    ]

# Generated by Django 3.2.4 on 2021-06-29 11:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('name', models.CharField(max_length=30, unique=True)),
                ('team', models.CharField(choices=[('w', 'white'), ('b', 'black')], default='w', max_length=1)),
                ('persianName', models.CharField(max_length=30, null=True)),
                ('description', models.CharField(max_length=255, null=True)),
                ('hidden', models.BooleanField(default=False)),
                ('primary', models.BooleanField(default=False)),
                ('checked', models.BooleanField(default=False)),
                ('test', models.BigIntegerField(default=100)),
            ],
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

# Generated by Django 3.2.4 on 2021-06-29 03:45

from django.db import migrations
import sort_order_field.fields


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_rename_priority_role_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='role',
            name='sort_order',
            field=sort_order_field.fields.SortOrderField(db_index=True, default=0),
        ),
    ]

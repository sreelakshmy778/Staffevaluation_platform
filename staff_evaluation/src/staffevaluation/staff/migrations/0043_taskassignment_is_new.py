# Generated by Django 5.2.3 on 2025-07-14 10:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0042_remove_taskassignment_is_new'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskassignment',
            name='is_new',
            field=models.BooleanField(default=True),
        ),
    ]

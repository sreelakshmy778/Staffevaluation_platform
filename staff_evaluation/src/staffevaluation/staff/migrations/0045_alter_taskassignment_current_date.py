# Generated by Django 5.2.3 on 2025-07-15 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0044_alter_taskassignment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskassignment',
            name='current_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]

# Generated by Django 5.2.3 on 2025-07-13 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0039_alter_attendance_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='taskassignment',
            name='status',
            field=models.CharField(choices=[('Completed', 'Completed'), ('In Progress', 'In Progress')], default='In Progress', max_length=15),
        ),
    ]

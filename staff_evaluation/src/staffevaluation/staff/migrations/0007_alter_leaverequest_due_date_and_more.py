# Generated by Django 5.2.3 on 2025-07-03 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0006_alter_leaverequest_status_alter_userdata_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaverequest',
            name='due_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='leaverequest',
            name='from_date',
            field=models.DateField(),
        ),
    ]

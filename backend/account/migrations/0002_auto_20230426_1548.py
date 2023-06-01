# Generated by Django 3.2 on 2023-04-26 10:18

import account.models
from django.db import migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='image',
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='date_joined',
            field=account.models.CustomDateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='last_login',
            field=account.models.CustomDateTimeField(default=django.utils.timezone.now),
        ),
    ]
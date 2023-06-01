# Generated by Django 4.2 on 2023-05-19 07:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0016_auto_20230512_1008'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teachers',
            name='country',
        ),
        migrations.RemoveField(
            model_name='teachers',
            name='email',
        ),
        migrations.RemoveField(
            model_name='teachers',
            name='id',
        ),
        migrations.RemoveField(
            model_name='teachers',
            name='image',
        ),
        migrations.RemoveField(
            model_name='teachers',
            name='is_block',
        ),
        migrations.RemoveField(
            model_name='teachers',
            name='is_verified',
        ),
        migrations.RemoveField(
            model_name='teachers',
            name='mobile_number',
        ),
        migrations.RemoveField(
            model_name='teachers',
            name='name',
        ),
        migrations.AddField(
            model_name='teachers',
            name='user',
            field=models.OneToOneField(default='', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='country',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='mobile_number',
            field=models.CharField(default='', max_length=20),
        ),
    ]
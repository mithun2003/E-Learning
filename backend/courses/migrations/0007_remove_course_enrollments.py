# Generated by Django 4.2 on 2023-05-20 06:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_wishlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='enrollments',
        ),
    ]

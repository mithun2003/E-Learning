# Generated by Django 4.2 on 2023-05-27 15:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0020_course_chat_room'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='chat_room',
        ),
    ]
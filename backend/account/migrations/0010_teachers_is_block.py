# Generated by Django 4.2 on 2023-05-05 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0009_rename_teacher_teachers'),
    ]

    operations = [
        migrations.AddField(
            model_name='teachers',
            name='is_block',
            field=models.BooleanField(default=False),
        ),
    ]

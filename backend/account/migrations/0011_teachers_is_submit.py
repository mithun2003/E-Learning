# Generated by Django 3.2 on 2023-05-09 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0010_teachers_is_block'),
    ]

    operations = [
        migrations.AddField(
            model_name='teachers',
            name='is_submit',
            field=models.BooleanField(default=False),
        ),
    ]
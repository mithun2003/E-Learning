# Generated by Django 4.2 on 2023-05-29 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0018_alter_teachers_user_alter_useraccount_country_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='is_pending',
            field=models.BooleanField(default=False),
        ),
    ]

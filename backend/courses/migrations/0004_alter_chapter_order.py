# Generated by Django 3.2 on 2023-05-09 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_auto_20230509_1155'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chapter',
            name='order',
            field=models.PositiveIntegerField(),
        ),
    ]
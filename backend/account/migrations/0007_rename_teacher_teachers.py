# Generated by Django 4.2 on 2023-05-04 17:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_rename_full_name_teacher_name'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Teacher',
            new_name='Teachers',
        ),
    ]
# Generated by Django 3.2 on 2023-05-12 04:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0015_remove_useraccount_submitted_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teachers',
            name='image',
            field=models.ImageField(default=None, upload_to='teachers/'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='teachers',
            name='resume',
            field=models.FileField(default=None, upload_to='resumes/'),
            preserve_default=False,
        ),
    ]

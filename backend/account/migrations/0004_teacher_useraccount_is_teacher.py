# Generated by Django 4.2 on 2023-05-04 03:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_useraccount_is_student'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='teachers/')),
                ('country', models.CharField(max_length=50)),
                ('mobile_number', models.CharField(max_length=20)),
                ('address', models.CharField(max_length=200)),
                ('highest_qualification', models.CharField(max_length=100)),
                ('skills', models.TextField()),
                ('resume', models.FileField(upload_to='resumes/')),
                ('is_verified', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='useraccount',
            name='is_teacher',
            field=models.BooleanField(default=False),
        ),
    ]
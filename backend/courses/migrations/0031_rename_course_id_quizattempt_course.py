# Generated by Django 4.2 on 2023-06-03 04:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0030_remove_quizattempt_quiz_quizattempt_course_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='quizattempt',
            old_name='course_id',
            new_name='course',
        ),
    ]
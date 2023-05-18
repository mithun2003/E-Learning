from django.db import models
from account.models import *
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100,blank=False)
    is_publish = models.BooleanField(default=True)
    created_at = models.DateField(auto_now_add = True)
    updated_at = models.DateField(auto_now_add=True)

class Course(models.Model):
    title = models.CharField(max_length=100,blank=False,unique=True)
    image = models.ImageField(upload_to='course/', blank=False, null=False)
    desc = models.TextField()
    cat = models.ManyToManyField(Category)
    enrollments = models.PositiveIntegerField(default=0)
    duration = models.DurationField()
    level = models.CharField(max_length=15)
    teacher = models.ForeignKey(Teachers,on_delete=models.CASCADE)
    is_publish = models.BooleanField(default=True)
    created_at = models.DateField(auto_now_add = True)
    updated_at = models.DateField(auto_now=True)
    
class Chapter(models.Model):
    title = models.CharField(max_length=100, blank=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='chapters')
    order = models.PositiveIntegerField()
    video = models.FileField(upload_to='chapter_videos/', blank=False)
    created_at = models.DateField(auto_now_add = True)
    updated_at = models.DateField(auto_now=True)
    class Meta:
        ordering = ['order']
    
    
class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    enrolled_at = models.DateField(auto_now_add = True)

from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from datetime import timedelta
from django.utils.timezone import make_aware
class CustomDateTimeField(models.DateTimeField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('default', timezone.now().replace(microsecond=0))
        super().__init__(*args, **kwargs)

class MyAccountManager(BaseUserManager):
    def create_user(self,name,email,password=None):
        if not email:
            raise ValueError("User must have an email")
        
        email = self.normalize_email(email)
        user = self.model(email=email,name=name)
        
        user.set_password(password)
        user.save()
        
        return user
    def create_superuser(self ,name, email, password):
        user = self.create_user(
            email = email,
            name  = name,
            password = password,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_active = True
        user.is_verified = True
        user.is_superuser = True
        user.save(using=self._db)
        return 
    
class UserAccount(AbstractBaseUser):
    name = models.CharField(max_length = 50,blank=False)
    email  = models.EmailField(max_length = 100, unique = True,blank=False)
    is_submit = models.BooleanField(default=False)
    # objects = models.Manager()
    image = models.ImageField(upload_to='profiles/', blank=True,null=True)
    date_joined = models.DateField(auto_now_add = True)
    last_login = models.DateField(auto_now=True)
    is_student = models.BooleanField(default=True)
    is_teacher = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_block = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = MyAccountManager()
    def __str__(self):
        return self.name
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
    
    

class Teachers(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='teachers/', blank=False)
    country = models.CharField(max_length=50)
    mobile_number = models.CharField(max_length=20)
    address = models.CharField(max_length=200)
    highest_qualification = models.CharField(max_length=100)
    skills = models.TextField()
    resume = models.FileField(upload_to='resumes/',blank=False,null=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_block = models.BooleanField(default=False)

    def __str__(self):
        return self.name

from djoser.email import ActivationEmail
from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *
from djoser import utils
from django.conf import settings as djangosettings
from django.contrib.auth.tokens import default_token_generator
from djoser import utils
from djoser.conf import settings

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'name', 'email', 'password')
class TeacherCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = ('id', 'name', 'email', 'image','country','mobile_number','address','highest_qualification','skills','resume')

# class UserSerializerDjoser(UserSerializer):
#     class Meta(UserSerializer.Meta):
#         model = User
#         fields = (
#             "id",
#             "name",
#             "email",
#             "is_active",
#             "is_block",
#             'is_student'
#         )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = (
            "id",
            "name",
            "email",
            "is_active",
            "is_block",
            'is_student',
            "is_teacher",
            "is_submit"
        )
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = (
            "id",
            "name",
            "email",
            "highest_qualification",
            "skills",
            'address',
            'image',
            'country',
            'mobile_number',
            'resume',
            'is_block',
            'is_verified'
        )


class CustomActivationEmail(ActivationEmail):
    template_name = "email/activation.html"

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()
        context['name'] = 'E-Learning'
        context['domain'] = djangosettings.FRONT_END
        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
        return context

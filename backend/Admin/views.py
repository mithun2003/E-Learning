from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from account.serializers import *
from account.models import Teachers
from courses.models import *
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from chat.models import *

class Total_Enrollments(APIView):
    def get(self,request):
        enrollments=Enrollment.objects.all().count()
        return Response({"data":enrollments})
class Total_Teachers(APIView):
    def get(self,request):
        teacher = Teachers.objects.filter(user__is_staff=False,user__is_teacher=True).count()
        return Response({"teacher":teacher})
class Total_Users(APIView):
    def get(self,request):
        users = UserAccount.objects.filter(is_staff=False,is_teacher=False).count()
        return Response({"user":users})
class Total_Courses(APIView):
    def get(self,request):
        courses = Course.objects.all().count()
        return Response({"course":courses})
    
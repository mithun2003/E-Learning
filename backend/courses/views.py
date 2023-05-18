from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
# Create your views here.
from account.serializers import *
from account.models import Teachers

import json


class CreateCategory(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CategoryCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ViewCategory(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Category.objects.all().order_by('-created_at')
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)


class PublishCategory(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        try:
            category = Category.objects.get(id=id)
            category.is_block = not category.is_publish  # Toggle the value of `is_block`
            category.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except Category.DoesNotExist:
            return Response("Category not found", status=status.HTTP_404_NOT_FOUND)


class DeleteCategory(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        cat = Category.objects.get(id=id)
        cat.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


class CourseCreate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        print('KJDJFHS',request.data.get('cat'))
        serializer = CourseCreateSerializer(data=request.data)
        print("AFTER",request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ViewCourse(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Course.objects.all().order_by('-updated_at')
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)
class UserCourseView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Course.objects.filter(is_publish=True).order_by('-updated_at')
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)


class TeacherViewCourse(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Course.objects.get(id=1)
        # teachers = []
        # for course in queryset:
        #     teacher = course.teacher
        #     teachers.append(teacher)
        # serializer = TeacherSerializer(teachers, many=True)
        teacher = queryset.cat
        serializer = CategorySerializer(teacher)
        return Response(serializer.data)
        return Response(serializer.data)


class ViewOneCourse(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        queryset = Course.objects.get(id=id)
        serializer = CourseSerializer(queryset)
        return Response(serializer.data)


class DeleteCourse(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        course = Course.objects.get(id=id)
        course.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


class CourseUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        print("EDITING",request.data)
        try:
            course = Course.objects.get(pk=id)
        except Course.DoesNotExist:
            return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseCreateSerializer(course, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateChapter(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        print(request.data)
      
        serializer = ChapterCreateSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ViewAllChapter(APIView):
        permission_classes=[AllowAny]
        def get(self, request, course_id):
            course = Course.objects.get(id=course_id)
            chapters = Chapter.objects.filter(course=course).order_by('order')
            serializer = ChapterSerializer(chapters, many=True)
            return Response(serializer.data)
        
class PublishCourse(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        try:
            course = Course.objects.get(id=id)
            course.is_publish = not course.is_publish  # Toggle the value of `is_block`
            course.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except Course.DoesNotExist:
            return Response("Course not found", status=status.HTTP_404_NOT_FOUND)
        
class DeleteChapter(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        chapter = Chapter.objects.get(id=id)
        chapter.delete()
        return Response(status=status.HTTP_202_ACCEPTED)




class Enroll(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request, course_id):
        print(request.user)
        course = Course.objects.get(pk=course_id)
        enrolled = Enrollment.objects.filter(course=course,user=request.user)
        print(enrolled)
        if enrolled.exists():
            return Response({'message': 'You are already enrolled in this course.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            enrollment = Enrollment(course=course, user=request.user)
            enrollment.save()
            course.enrollments += 1
            course.save() 
            serializer = EnrollmentSerializer(enrollment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class ViewEnrolled(APIView):
    def get(self,request,course_id):
        course = Course.objects.get(id=course_id)
        enrollment = Enrollment.objects.filter(course=course, user=request.user).exists()
        return Response({'enrolled': enrollment})
class ViewOneChapter(APIView):
    def get(self,request,chapter_id):
        chapter = Chapter.objects.get(id=chapter_id)
        serializer = ChapterSerializer(chapter)
        return Response(serializer.data)
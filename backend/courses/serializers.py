from rest_framework import serializers
from .models import *
from account.serializers import *
class CategoryCreateSerializer(serializers.ModelSerializer):
    # created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    class Meta:
        model = Category
        fields = ('id', 'name', 'created_at', 'is_publish')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'created_at',
            'is_publish'
        )


class CourseCreateSerializer(serializers.ModelSerializer):
    print(serializers.ModelSerializer)
    class Meta:
        model = Course
        fields = (
                  'id',
                  'title',
                  'image',
                  'desc',
                  'cat',
                  'enrollments',
                  'duration',
                  'level',
                  'teacher',
                  'is_publish'               
                  )


class CourseSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()  # serialize the related teacher data
    cat = CategorySerializer(many=True)  # serialize the related category data
    image = serializers.SerializerMethodField()
    def get_image(self,obj):
        if obj.image:
            return "http://localhost:8000/"+obj.image.url
        else:
            return None
    class Meta:
        model = Course
        fields = '__all__'
class ChapterCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ('id', 'title', 'video', 'order','course')
class ChapterSerializer(serializers.ModelSerializer):
    video = serializers.SerializerMethodField()

    def get_video(self, obj):
        if obj.video:
            return "http://localhost:8000" + obj.video.url
        else:
            return None
    class Meta:
        model = Chapter
        fields = '__all__'



class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'
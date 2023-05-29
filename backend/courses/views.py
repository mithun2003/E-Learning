from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
# Create your views here.
from account.serializers import *
from account.models import Teachers
from .models import *

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import BannerSerializer
from chat.models import *
# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync

class Banner(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CreateBannerSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        queryset = Banners.objects.all().order_by('-active')
        if queryset:
            serializer = BannerSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response({}, status=status.HTTP_204_NO_CONTENT)


class BannerUser(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = Banners.objects.filter(active=True).first()
        if query:
            serializer = BannerSerializer(query)
            return Response(serializer.data)
        else:
            return Response({}, status=status.HTTP_204_NO_CONTENT)


class EditBanner(APIView):
    def post(self, request, id):
        try:
            banner = Banners.objects.get(id=id)
            banner.active = not banner.active
            banner.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except Banners.DoesNotExist:
            return Response("Banner not found", status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        try:
            banner = Banners.objects.get(id=id)
            banner.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except Banners.DoesNotExist:
            return Response("Banner not found", status=status.HTTP_404_NOT_FOUND)


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

        print('KJDJFHS', request.data.get('cat'))
        serializer = CourseCreateSerializer(data=request.data)
        print("AFTER", request.data)
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


# Retreive all courses added by a teacher

class TeacherViewCourse(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        try:
            teacher = Teachers.objects.get(user_id=id)
            courses = Course.objects.filter(teacher=teacher)
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)
        except Teachers.DoesNotExist:
            return Response({'message': 'Teacher not found'}, status=status.HTTP_404_NOT_FOUND)


# class ViewOneCourse(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, id):
#         queryset = Course.objects.get(id=id)
#         serializer = CourseSerializer(queryset)
#         try:
#             progress = VideoProgress.objects.filter(course_id=id, user_id=request.user.id)
#             progress_data = VideoProgressSerializer(progress)
#         except VideoProgress.DoesNotExist:
#             return Response({'message': 'VideoProgress not found'}, status=status.HTTP_404_NOT_FOUND)

#         # return Response(progress_data.data,serializer.data)
#         return Response({'course': progress_data.data, 'progress': progress_data})

class AdminViewOneCourse(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        try:
            course = Course.objects.get(id=id)
        except Course.DoesNotExist:
            return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(course)

        return Response(serializer.data)


class ViewOneCourse(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        try:
            course = Course.objects.get(id=id)
        except Course.DoesNotExist:
            return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(course)
        user = request.user
        if user.is_authenticated:
            completed_videos = VideoProgress.objects.filter(user=user, course=id, is_completed=True).count()
            total_videos = Chapter.objects.filter(course_id=id).count()
            if total_videos != 0:
                progress = (completed_videos / total_videos) * 100
            else:
                progress = 0
            try:
                course_progress = CourseProgress.objects.get(course_id=id, user_id=user.id)
                course_progress.progress = progress
                course_progress.save()
            except CourseProgress.DoesNotExist:
                progress_data = None
                # return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
            try:
                progress = CourseProgress.objects.get(course_id=id, user_id=request.user.id)
                progress_data = progress.progress
            except:
                progress_data = None
        else:
            progress_data = None
        response_data = {
            'course': serializer.data,
            'progress': progress_data
        }
        return Response(response_data)


class DeleteCourse(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        course = Course.objects.get(id=id)
        name = course.title
        course.delete()
        chat = ChatRoom.objects.get(name = name)
        chat.delete()
        return Response(status=status.HTTP_202_ACCEPTED)


class CourseUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        print("EDITING", request.data)
        try:
            course = Course.objects.get(pk=id)
            old_title = course.title
        except Course.DoesNotExist:
            return Response({'message': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseCreateSerializer(course, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        updated_course = serializer.save()

        # Update chat room name if it exists
        if 'title' in request.data:
            new_title = request.data['title']
            chat_room = ChatRoom.objects.get(name=old_title)
            if chat_room:
                chat_room.name = new_title
                chat_room.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateChapter(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)

        serializer = ChapterCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ViewAllChapter(APIView):
    permission_classes = [AllowAny]

    def get(self, request, course_id):
        course = Course.objects.get(id=course_id)
        chapters = Chapter.objects.filter(course=course).order_by('order')
        serializer = ChapterSerializer(chapters, many=True, context={'request': request})
        return Response(serializer.data)


class ViewAllChapterAdmin(APIView):
    permission_classes = [AllowAny]

    def get(self, request, course_id):
        course = Course.objects.get(id=course_id)
        chapters = Chapter.objects.filter(course=course).order_by('order')
        serializer = AdminChapterSerializer(chapters, many=True)
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
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):

        course = Course.objects.get(pk=course_id)
        enrolled = Enrollment.objects.filter(course=course, user=request.user).exists()

        if enrolled:
            return Response({'message': 'You are already enrolled in this course.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            enrollment = Enrollment(course=course, user=request.user)
            enrollment.save()
            course_progress = CourseProgress(user=request.user, course=course)
            course_progress.save()
            try:
                chat_room = ChatRoom.objects.get(name=course.title)
                chat_room.users.add(request.user.id)
            except ChatRoom.DoesNotExist:
                return Response({'message': 'Not found.'}, status=status.HTTP_400_BAD_REQUEST)  
            serializer = EnrollmentSerializer(enrollment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class Unenroll(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        course = Course.objects.get(pk=course_id)
        enrollment = Enrollment.objects.filter(course=course, user=request.user)

        if enrollment.exists():
            enrollment.delete()
            course_progress = CourseProgress.objects.filter(user=request.user, course=course)
            if course_progress.exists():
                course_progress.delete()
            return Response({'message': 'Successfully unenrolled from the course.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'You are not enrolled in this course.'}, status=status.HTTP_400_BAD_REQUEST)


class ViewEnrolled(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        course = Course.objects.get(pk=course_id)
        enrolled = Enrollment.objects.filter(course=course, user=request.user).exists()

        return Response({'enrolled': enrolled})


class CheckEnroll(APIView):
    def get(self, request, course_id):
        enroll = Enrollment.objects.filter(course_id=course_id, user=request.user.id).exists()
        if enroll:
            return Response(enroll)
        else:
            return Response(enroll)


class ViewOneChapter(APIView):
    def get(self, request, chapter_id):
        chapter = Chapter.objects.get(id=chapter_id)
        serializer = ChapterSerializer(chapter, context={'request': request})
        return Response(serializer.data)


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist = Wishlist.objects.get(user=request.user)
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)

    def post(self, request):
        course_id = request.data.get('course_id')
        course = Course.objects.get(pk=course_id)
        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
        wishlist.courses.add(course)
        return Response({'message': 'Course added to wishlist'})

    def delete(self, request):
        course_id = request.data.get('course_id')
        course = Course.objects.get(pk=course_id)
        wishlist = Wishlist.objects.get(user=request.user)
        wishlist.courses.remove(course)
        return Response({'message': 'Course removed from wishlist'})


class Review(APIView):
    def post(self, request, course_id):
        # course = Course.objects.get(id=course_id)
        # user = UserAccount.objects.get(id=request.user.id)
        request.data['course'] = course_id
        request.data['user'] = request.user.id
        print(request.data)
        serializer = CreateReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, course_id):

        query = CourseReview.objects.filter(course_id=course_id).order_by('-rating')
        print(query)
        serializer = ReviewSerializer(query, many=True)
        print(serializer)

        return Response(serializer.data)


class ContactMe(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        query = Contact.objects.all()
        serializer = ContactSerializer(query, many=True)
        return Response(serializer.data)


class Progress(APIView):
    def post(self, request, chapter_id):
        course_id = request.data.get('course_id')
        user = request.user
        try:
            enroll = Enrollment.objects.get(course_id=course_id, user_id=user.id)
        except Enrollment.DoesNotExist:
            return Response({'message': 'You have to enroll in this course'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            chapter = Chapter.objects.get(id=chapter_id, course_id=course_id)
        except Chapter.DoesNotExist:
            return Response({"error": "Invalid chapter"}, status=status.HTTP_404_NOT_FOUND)

        data = {
            'user': user.id,
            'course': course_id,
            'video': chapter_id,
            'is_completed': True
        }
        existing_progress = VideoProgress.objects.filter(user=user, course=course_id, video=chapter_id)
        if existing_progress.exists():
            serializer = VideoProgressSerializer(existing_progress.first())
        else:
            serializer = VideoProgressSerializer(data=data)
            completed_videos = VideoProgress.objects.filter(user=user, course=course_id, is_completed=True).count()
            total_videos = Chapter.objects.filter(course_id=course_id).count()
            if total_videos != 0:
                progress = (completed_videos / total_videos) * 100
            else:
                progress = 0
            try:
                course_progress = CourseProgress.objects.get(course_id=course_id, user_id=user.id)
                course_progress.progress = progress
                course_progress.save()
            except CourseProgress.DoesNotExist:
                CourseProgress.objects.create(user=user, course_id=course_id, progress=progress)
        if not existing_progress.exists():
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Video exists'})

    def get(self, request, chapter_id):
        course_id = request.data.get('course_id')
        user = request.user
        query = VideoProgress.objects.filter(user=user, course=course_id, video=chapter_id)
        serializer = VideoProgressSerializer(query, many=True)
        return Response(serializer.data)


class Course_By_Category(APIView):
    def get(self, request, cat_id):
        try:
            course = Course.objects.filter(cat__id=cat_id)
            serializer = CourseSerializer(course, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Course.DoesNotExist():
            return Response(serializers.data, status=status.HTTP_400_BAD_REQUEST)

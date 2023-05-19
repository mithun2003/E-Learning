from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
# from rest_framework.permissions import IsAuthenticated
# from django.http import Http404
from .models import UserAccount, Teachers
from rest_framework_simplejwt.tokens import RefreshToken
# from django.shortcuts import get_object_or_404
# from rest_framework.exceptions import ParseError
# from rest_framework.exceptions import AuthenticationFailed
# from django.db.models import Q
from django.contrib.auth import authenticate, login
# from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from djoser.views import TokenCreateView
from rest_framework.decorators import permission_classes
from django.core.mail import send_mail
from datetime import datetime, timedelta
class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_403_FORBIDDEN)

        if not user.is_staff:
            return Response({'error': 'You are not authorized to perform this action'}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)

        user_data = {
            'email': user.email,
            'name': user.name,
        }

        response_data = {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': user_data,
        }

        return Response(response_data, status=status.HTTP_200_OK)


class RetrieveUserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = UserAccount.objects.filter(
            is_staff=False, is_student=True).order_by('-date_joined')
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class GetOneUser(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        # email = 'root@gmail.com'
        email = request.GET.get('email')
        user = UserAccount.objects.get(email=email)
        serializer = UserSerializer(user)
        print(request)
        return Response(serializer.data)

class ViewOneUser(APIView):
    permission_classes = [AllowAny]

    def get(self, request,user_id):

        # email = 'root@gmail.com'
        # email = request.GET.get('email')
        user = UserAccount.objects.get(id=user_id)
        serializer = UserSerializer(user)
        print(request)
        return Response(serializer.data)


class DeleteUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, id):
        user = UserAccount.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

# @permission_classes([IsAdminUser])


class BlockUser(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        try:
            user = UserAccount.objects.get(id=id)
            user.is_block = not user.is_block  # Toggle the value of `is_block`
            user.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except UserAccount.DoesNotExist:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)

@permission_classes([AllowAny])
class Login(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            if user.is_active:
                # Check if the user is blocked
                if user.is_block:
                    return Response({'message': 'Your account has been blocked'}, status=status.HTTP_403_FORBIDDEN)

                # Login the user
                login(request, user)

                # Generate JWT token
                refresh = RefreshToken.for_user(user)

                return Response({'message': 'Login successful', 'access': str(refresh.access_token), 'refresh': str(refresh)})
            else:
                return Response({'message': 'Your account is inactive'},status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class Teacher(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        is_submit = request.data.pop('is_submit', False)
        if is_submit == False:
            pass
        else:
            is_submit = True
        # Save the value of is_submit to the User model
        user = request.user
        user.is_submit = is_submit# Add the current datetime
        user.save()
        # Remove is_submit from request.data
        request.data.pop('is_submit', None)
        print(request.data)
        serializer = TeacherCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestTeacher(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # queryset = Teachers.objects.all()
        queryset = Teachers.objects.filter(
            is_verified=False).order_by('-created_at')
        serializer = TeacherSerializer(queryset, many=True)
        return Response(serializer.data)


class OneTeacher(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        # id = request.GET.get('id')
        teacher = Teachers.objects.get(id=id)
        serializer = TeacherSerializer(teacher)
        print(request)
        return Response(serializer.data)


class Verify(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        try:
            teacher = Teachers.objects.get(id=id)
            if teacher.is_verified:
                return JsonResponse({'message': 'Teacher is already verified'})

            # Perform verification logic

            # Set teacher as verified
            teacher.is_verified = True
            teacher.save()

            user = UserAccount.objects.get(email=teacher.email)
            user.is_student = False
            user.is_teacher = True
            user.save()

            # Send email
            subject = 'Teacher Verification'
            message = 'Congratulations! You have been verified as a teacher.'
            from_email = 'mithuncy65@gmail.com'
            to_email = teacher.email
            send_mail(subject, message, from_email, [to_email])

            return JsonResponse({'message': 'Teacher verified successfully'})
        except Teacher.DoesNotExist:
            return JsonResponse({'message': 'Teacher not found'}, status=404)


class Reject(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        try:
            teacher = Teachers.objects.get(id=id)
            if teacher.is_verified:
                return JsonResponse({'message': 'Cannot reject an already verified teacher'})

            # Perform rejection logic

            # Send email
            subject = 'Teacher Rejection'
            message = 'We regret to inform you that your teacher application has been rejected.'
            from_email = 'mithuncy65@gmail.com'
            to_email = teacher.email
            send_mail(subject, message, from_email, [to_email])

            # Delete the teacher
            user = UserAccount.objects.get(email=teacher.email)
            user.is_submit=False
            user.save()
            teacher.delete()
            return JsonResponse({'message': 'Teacher rejected and deleted successfully'})
        except Teacher.DoesNotExist:
            return JsonResponse({'message': 'Teacher not found'}, status=404)


class RetrieveTeacherView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = Teachers.objects.filter(
            is_verified=True).order_by('-created_at')
        serializer = TeacherSerializer(queryset, many=True)
        return Response(serializer.data)
    
class BlockTeacher(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        try:
            teacher = Teachers.objects.get(id=id)
            teacher.is_block = not teacher.is_block  # Toggle the value of `is_block`
            teacher.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        except Teachers.DoesNotExist:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)


class EditUser(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):
        try:
            user = UserAccount.objects.get(pk=id)
        except UserAccount.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserEditSerializer(user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        is_teacher = user.is_teacher

        if is_teacher:
            teacher = Teacher.objects.get(user=user)
            teacher_serializer = TeacherSerializer(teacher, data=request.data, partial=True)
            if not teacher_serializer.is_valid():
                return Response(teacher_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            teacher_serializer.save()
        
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
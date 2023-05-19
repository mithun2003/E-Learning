from django.urls import path

from .views import *
urlpatterns = [
        path('category-create', CreateCategory.as_view()),
        path('category-list', ViewCategory.as_view()),
        path('category/publish/<id>',PublishCategory.as_view()),
        path('category/delete/<id>',DeleteCategory.as_view()),
        
        
        path('publish/<id>',PublishCourse.as_view()),
        path('course-create', CourseCreate.as_view()),
        path('course-list', ViewCourse.as_view()),
        path('user/course-list', UserCourseView.as_view()),
        path('course-detail/<id>', ViewOneCourse.as_view()),
        path('course-delete/<id>', DeleteCourse.as_view()),
        path('course-edit/<id>', CourseUpdate.as_view()),
        path('teacher-list', TeacherViewCourse.as_view()),
        
        
        path('chapter-add', CreateChapter.as_view()),
        path('chapter-delete/<id>', DeleteChapter.as_view()),
        path('<int:course_id>/chapter-list/', ViewAllChapter.as_view()),
        path('chapter/<chapter_id>', ViewOneChapter.as_view()),
        
        
        
        path('enroll/<course_id>', Enroll.as_view()),
        path('enrollement/<course_id>', ViewEnrolled.as_view()),
        
        
        
        path('', Enroll.as_view()),
]


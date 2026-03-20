"""
URL configuration for enrollment project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from myapp.views import CreateStudent, ViewStudent, GetStudent, UpdateStudent, DeleteStudent

urlpatterns = [
    path('api/createstudent/',          CreateStudent.as_view()),  # POST
    path('api/viewstudent/',            ViewStudent.as_view()),    # GET all
    path('api/getstudent/<int:pk>/',    GetStudent.as_view()),     # GET one ✅
    path('api/updatestudent/<int:pk>/', UpdateStudent.as_view()),  # PUT
    path('api/deletestudent/<int:pk>/', DeleteStudent.as_view()),  # DELETE
]
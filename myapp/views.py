from rest_framework.generics import (
    ListAPIView,
    UpdateAPIView,
    DestroyAPIView,
    CreateAPIView,
    RetrieveAPIView        # ✅ Add this
)
from myapp.serializers import StudentSerializer
from myapp.models import Student

class CreateStudent(CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class ViewStudent(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class GetStudent(RetrieveAPIView):       # ✅ New — fetch single student
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class UpdateStudent(UpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class DeleteStudent(DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
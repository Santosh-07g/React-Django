from myapp.models import Student
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'email', 'department', 'course']  # ✅ id added
        read_only_fields = ['id']

from rest_framework import serializers
from .models import Notes

class NoteSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%b %d, %Y, %I:%M %p",
        read_only=True
    )

    class Meta:
        model = Notes

        fields = [
    "id",
    "title",
    "content",
    "created_at",
    "updated_at",
]
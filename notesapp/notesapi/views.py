from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.cache import cache

from .models import Notes
from .serializers import NoteSerializer


class NotesView(ModelViewSet):

    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        return Notes.objects.filter(user=self.request.user)


    def get_cache_key(self):
        return f"notes_{self.request.user.id}"


    def clear_cache(self):
        cache.delete(self.get_cache_key())


    def list(self, request, *args, **kwargs):
        cache_key = self.get_cache_key()

        cached_notes = cache.get(cache_key)

        if cached_notes:
            print("Redis HIT")
            return Response(cached_notes)


        print("Redis MISS")

        queryset = self.get_queryset()

        serializer = self.get_serializer(queryset, many=True)

        notes_data = serializer.data

        cache.set(cache_key, notes_data, 60)

        return Response(notes_data)


    def perform_create(self, serializer):

        serializer.save(user=self.request.user)

        self.clear_cache()


    def perform_update(self, serializer):

        serializer.save()

        self.clear_cache()


    def perform_destroy(self, instance):

        instance.delete()

        self.clear_cache()
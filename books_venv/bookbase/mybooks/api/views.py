from django.shortcuts import render
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from serializers import BookSerializer, Book
from filters import BooksFilter


class BooksList(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all().order_by("author")
    serializer_class = BookSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('book_name', 'author')


class BookSearchView(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.all().order_by("author")
    serializer_class = BookSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('book_name', 'author')

    def paginate_queryset(__, _):
        return None

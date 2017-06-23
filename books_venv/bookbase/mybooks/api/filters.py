import django_filters
from ..models import *
from django.db.models import Q


class BooksFilter(django_filters.FilterSet):

    class Meta:
        model = Book
        fields = ("author", "book_name")

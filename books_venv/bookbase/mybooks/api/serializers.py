# -*- coding: utf-8 -*-
from rest_framework import serializers
from ..models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("book_name", "author", "notes", 'unique_id')

    def validate(self, data):
        if Book.objects.filter(author=data['author'], book_name=data['book_name']).first() is not None:
            raise serializers.ValidationError(u"הספר כבר קיים!")
        return data

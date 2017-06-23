# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from six import python_2_unicode_compatible
from django.db import models
from uuid import uuid4
from django.utils.timezone import datetime

# Create your models here.
@python_2_unicode_compatible
class Book(models.Model):
    book_name = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    unique_id = models.CharField(max_length=100, unique=True, default=uuid4)
    notes = models.TextField(null=True)
    date_added = models.DateField(default=datetime.now)

    def __str__(self):
        return u"{} / {} - {}".format(self.author, self.book_name, self.notes)
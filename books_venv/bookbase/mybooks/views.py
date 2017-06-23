# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.six import BytesIO
from rest_framework.parsers import JSONParser
from api.serializers import BookSerializer

# Create your views here.

def index(request):
    return render(request, "index.html")


@csrf_exempt
def add_book(request):
    if request.method == "POST":
        stream = BytesIO(request.body)
        data = JSONParser().parse(stream)
        serializer = BookSerializer(data=data)
        if not serializer.is_valid():
            return JsonResponse({"status": "fail", "msg": serializer.errors})
        serializer.save()
        return JsonResponse({"status": "OK", "msg": u"הספר נוסף בהצלחה!"})
    else:
        return HttpResponse(":3")

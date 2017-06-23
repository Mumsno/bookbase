from django.conf.urls import url, include
from rest_framework import routers
from . import views
from api import views as api_views

router = routers.SimpleRouter()
router.register(r"books", api_views.BooksList)
router.register(r"book_search", api_views.BookSearchView)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r"^add_book/", views.add_book)
]

urlpatterns += router.urls


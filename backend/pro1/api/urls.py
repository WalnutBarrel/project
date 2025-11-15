from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('books/', views.books_list), 
    path('books/<int:pk>/', views.book_detail),
]

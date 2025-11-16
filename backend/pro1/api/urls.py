from django.urls import path
from . import views
from .views import create_order

urlpatterns = [
    path('signup/', views.signup),
    path('login/', views.login),
    path('books/', views.books_list), 
    path('books/<int:pk>/', views.book_detail),
    path("orders/", create_order, name="create-order"),

]

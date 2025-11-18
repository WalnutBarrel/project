from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, permissions
from .models import User, Book, Order
from .serializers import UserSerializer, BookSerializer, OrderSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import get_user_model

# Signup API
@api_view(['POST'])
def signup(request):
    data = request.data

    # check if user already exists
    if User.objects.filter(email=data['email']).exists():
        return Response({"message": "Email already registered"}, status=400)

    # create user with hashed password
    user = User(
        name=data['name'],
        email=data['email'],
        password=make_password(data['password'])
    )
    user.save()

    return Response({"message": "Signup successful"}, status=200)


# Login API
@api_view(['POST'])
def login(request):
    data = request.data

    try:
        user = User.objects.get(email=data['email'])

        if check_password(data['password'], user.password):
            return Response({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }
            }, status=200)
        else:
            return Response({"message": "Incorrect password"}, status=400)

    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)


@api_view(['GET'])
def books_list(request):
    """
    GET /api/books/  -> list all books
    """
    books = Book.objects.all().order_by('id')
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def book_detail(request, pk):
    """
    GET /api/books/<id>/  -> single book details
    """
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({"message": "Not found"}, status=404)

    serializer = BookSerializer(book)
    return Response(serializer.data)


@api_view(['POST'])
def create_order(request):
    data = request.data.copy()

    # IMPORTANT: convert user_id → user (foreign key)
    if "user_id" in data:
        data["user"] = data["user_id"]

    serializer = OrderSerializer(data=data)

    if serializer.is_valid():
        order = serializer.save()
        return Response({"message": "Order saved", "order_id": order.id}, status=201)

    return Response(serializer.errors, status=400)


@api_view(['GET'])
def my_orders(request):
    """
    GET /api/my-orders/?user_id=<id>

    Returns all orders for the given user.
    """
    user_id = request.GET.get("user_id")

    if not user_id:
        return Response({"message": "user_id is required"}, status=400)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)

    # Get all orders for this user
    orders = Order.objects.filter(user=user).order_by('-id')

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def user_orders(request, user_id):
    orders = Order.objects.filter(user=user_id).order_by('-id')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password, check_password

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

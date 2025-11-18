from rest_framework import serializers
from .models import User, Book, Order, OrderItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    # show book details nested (read-only)
    book = BookSerializer(read_only=True)
    book_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'book_id', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'name', 'email', 'address', 'city',
            'postal_code', 'phone', 'payment_method', 'total', 'items'
        ]
        extra_kwargs = {
            'user': {'required': False}   # allow user mapping
        }


    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order
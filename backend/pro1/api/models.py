from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(max_length=500)
    description = models.TextField(null=True, blank=True)
    rating = models.FloatField(default=0.0)
    genre = models.CharField(max_length=100, default="Unknown")  # ADD THIS
    pages = models.IntegerField(null=True, blank=True)
    language = models.CharField(max_length=50, default="English")

    def __str__(self):
        return self.title
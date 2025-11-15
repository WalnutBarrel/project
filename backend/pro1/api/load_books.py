import requests
from api.models import Book

def load_books_from_google(query="fiction", max_results=20):
    """
    Fetches books from Google Books API and inserts into the database.
    """
    print(f"Fetching books for query: {query}")

    url = f"https://www.googleapis.com/books/v1/volumes?q={query}&maxResults={max_results}"

    try:
        response = requests.get(url)
        data = response.json()
    except Exception as e:
        print("API request failed:", e)
        return

    items = data.get("items", [])

    if not items:
        print("No books found.")
        return

    added_count = 0

    for item in items:
        info = item.get("volumeInfo", {})

        title = info.get("title")
        authors = info.get("authors", ["Unknown"])
        description = info.get("description", "No description available.")
        image = info.get("imageLinks", {}).get("thumbnail", "")

        # Skip books without data
        if not title or not image:
            continue

        Book.objects.create(
            title=title,
            author=authors[0],
            price=299,  # default price (you can randomize later)
            description=description,
            image=image
        )
        added_count += 1

    print(f"Successfully added {added_count} books!")

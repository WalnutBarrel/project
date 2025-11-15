import requests
import random
from api.models import Book

GENRES = [
    "fiction",
    "romance",
    "thriller",
    "mystery",
    "fantasy",
    "kids",
    "history",
    "science",
    "adventure",
    "biography",
    "hindi books",
    "gujarati books"
]



def import_books_for_genre(genre, max_results=20):
    print(f"Importing books for genre: {genre}")

    url = f"https://www.googleapis.com/books/v1/volumes?q={genre}&maxResults={max_results}"

    if "hindi" in genre.lower():
        url += "&langRestrict=hi"
    if "gujarati" in genre.lower():
        url += "&langRestrict=gu"


    try:
        response = requests.get(url)
        data = response.json()
    except Exception as e:
        print("API request failed:", e)
        return 0

    items = data.get("items", [])
    if not items:
        print(f"No books found for {genre}.")
        return 0

    added = 0

    for item in items:
        info = item.get("volumeInfo", {})

        title = info.get("title")
        authors = info.get("authors", ["Unknown"])
        description = info.get("description", "No description.")
        image = info.get("imageLinks", {}).get("thumbnail")
        categories = info.get("categories", ["Unknown"])
        page_count = info.get("pageCount", 0)
        language = info.get("language", "English")

        # Skip invalid items
        if not title or not image:
            continue

        price = random.randint(199, 899)
        rating = round(random.uniform(3.5, 5.0), 1)

        Book.objects.create(
            title=title,
            author=authors[0],
            price=price,
            image=image,
            description=description,
            genre=", ".join(categories),  # convert list → string
            rating=rating,
            pages=page_count,
            language=language
        )

        added += 1

    print(f"{added} books added for {genre}")
    return added


def auto_import_all_books():
    total = 0
    for genre in GENRES:
        total += import_books_for_genre(genre, 20)
    print(f"\nTOTAL BOOKS IMPORTED: {total}\n")

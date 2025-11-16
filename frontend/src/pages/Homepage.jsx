import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

function Homepage({ searchQuery }) {

  const placeholderBooks = Array(4).fill(null);

  // STATES
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const [selectedGenre, setSelectedGenre] = useState("All");
  const [recommendedFilter, setRecommendedFilter] = useState("None");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedAuthor, setSelectedAuthor] = useState("All");

  const fixedAuthorList = [
    "EduGorilla Prep Experts",
    "Library of Congress",
    "R. Reginald",
    "Pasquale De Marco",
    "Carolyn Keene",
    "Rylie Dark",
    "Unknown"
  ];

  const languageMap = {
    English: "en",
    Hindi: "hi",
    Gujarati: "gu",
  };

  // FILTER LOGIC
  let filteredBooks = books;

  if (selectedGenre !== "All") {
    filteredBooks = filteredBooks.filter((book) =>
      book.genre?.toLowerCase().includes(selectedGenre.toLowerCase())
    );
  }

  if (recommendedFilter === "Top Rated") {
    filteredBooks = filteredBooks
      .filter((b) => b.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating);
  }

  if (recommendedFilter === "Editor's Picks") {
    filteredBooks = filteredBooks.filter((b) => b.rating >= 4.0);
  }

  if (recommendedFilter === "Trending") {
    filteredBooks = filteredBooks.sort(() => Math.random() - 0.5);
  }

  if (selectedLanguage !== "All") {
    const code = languageMap[selectedLanguage];
    filteredBooks = filteredBooks.filter((b) =>
      b.language?.toLowerCase().startsWith(code)
    );
  }

  if (selectedAuthor !== "All") {
    filteredBooks = filteredBooks.filter(
      (b) => b.author?.toLowerCase() === selectedAuthor.toLowerCase()
    );
  }

  if (searchQuery.trim() !== "") {
    filteredBooks = filteredBooks.filter((b) =>
      (b.title + " " + b.author).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const displayedBooks = filteredBooks.slice(0, visibleCount);

  // FETCH BOOKS
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/books/");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books", err);
      }
      setLoading(false);
    };
    getBooks();
  }, []);

  useEffect(() => setVisibleCount(8), [
    selectedGenre,
    recommendedFilter,
    selectedLanguage,
    selectedAuthor,
  ]);

  return (
    <>
      {/* ⭐ HERO CAROUSEL ⭐ */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              className="d-block w-100 hero-image"
              alt="Bookshelf"
            />
            <div className="carousel-caption">
              <h5>Explore Endless Stories</h5>
              <p>Find books that inspire and ignite your imagination.</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              className="d-block w-100 hero-image"
              alt="Reading"
            />
            <div className="carousel-caption">
              <h5>Discover New Worlds</h5>
              <p>Immerse yourself in bestsellers and hidden gems alike.</p>
            </div>
          </div>

        </div>

        {/* Prev / Next */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>


      {/* ⭐ CATEGORY BAR ⭐ */}
      <div className="category-bar shadow-sm">
        <div className="container d-flex justify-content-between py-3">

          {/* GENRE */}
          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Genre
            </span>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item" onClick={() => setSelectedGenre("General")}>General</span></li>
              <li><span className="dropdown-item" onClick={() => setSelectedGenre("History")}>History</span></li>
              <li><span className="dropdown-item" onClick={() => setSelectedGenre("Fiction")}>Fiction</span></li>
              <li><span className="dropdown-item" onClick={() => setSelectedGenre("Religion")}>Religion</span></li>
              <li><span className="dropdown-item" onClick={() => setSelectedGenre("All")}>Show All</span></li>
            </ul>
          </div>

          {/* RECOMMENDED */}
          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Recommended
            </span>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item" onClick={() => setRecommendedFilter("Top Rated")}>Top Rated</span></li>
              <li><span className="dropdown-item" onClick={() => setRecommendedFilter("Editor's Picks")}>Editor's Picks</span></li>
              <li><span className="dropdown-item" onClick={() => setRecommendedFilter("Trending")}>Trending</span></li>
              <li><span className="dropdown-item" onClick={() => setRecommendedFilter("None")}>Show All</span></li>
            </ul>
          </div>

          {/* LANGUAGE */}
          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Language
            </span>
            <ul className="dropdown-menu">
              <li><span className="dropdown-item" onClick={() => setSelectedLanguage("English")}>English</span></li>
              <li><span className="dropdown-item" onClick={() => setSelectedLanguage("Hindi")}>Hindi</span></li>
              <li><span className="dropdown-item" onClick={() => setSelectedLanguage("Gujarati")}>Gujarati</span></li>
              <li><span className="dropdown-item" onClick={() => setSelectedLanguage("All")}>Show All</span></li>
            </ul>
          </div>

          {/* AUTHOR */}
          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Author
            </span>
            <ul className="dropdown-menu">
              {fixedAuthorList.map((a, i) => (
                <li key={i}>
                  <span className="dropdown-item" onClick={() => setSelectedAuthor(a)}>
                    {a}
                  </span>
                </li>
              ))}
              <li><hr className="dropdown-divider" /></li>
              <li><span className="dropdown-item" onClick={() => setSelectedAuthor("All")}>Show All</span></li>
            </ul>
          </div>

        </div>
      </div>



      {/* ⭐ BOOK SECTION ⭐ */}
      <div className="container mt-4">

        <h2 className="section-title">Now Trending</h2>

        <div className="row g-4 mt-3">
          {loading && <p>Loading books...</p>}

          {!loading && displayedBooks.length === 0 && <p>No books found</p>}

          {displayedBooks.map((book) => (
            <div className="col-6 col-md-3" key={book.id}>
              <div
                className="book-card"
                onClick={() => (window.location.href = `/book/${book.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={book.image} alt={book.title} />
                <div className="book-info">
                  <h5>{book.title}</h5>
                  <p>{book.author}</p>
                  <p>₹{book.price}</p>
                </div>
              </div>
            </div>
          ))}

          {visibleCount < filteredBooks.length && (
            <div className="text-center mt-3">
              <button className="btn btn-outline-primary" onClick={() => setVisibleCount(visibleCount + 8)}>
                Load More
              </button>
            </div>
          )}

          {visibleCount > 8 && (
            <div className="text-center mt-2">
              <button className="btn btn-outline-secondary" onClick={() => setVisibleCount(8)}>
                Show Less
              </button>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default Homepage;

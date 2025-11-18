import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";


function Homepage({ searchQuery }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const [selectedGenre, setSelectedGenre] = useState("All");
  const [recommendedFilter, setRecommendedFilter] = useState("None");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedAuthor, setSelectedAuthor] = useState("All");

  // FIXED AUTHOR LIST
  const fixedAuthorList = [
    "EduGorilla Prep Experts",
    "Library of Congress",
    "R. Reginald",
    "Pasquale De Marco",
    "Carolyn Keene",
    "Rylie Dark",
    "Unknown",
  ];

  const languageMap = {
    English: "en",
    Hindi: "hi",
    Gujarati: "gu",
  };

  /* =======================================================
     FILTERING LOGIC
  ======================================================= */
  let filteredBooks = [...books];

  if (selectedGenre !== "All") {
    filteredBooks = filteredBooks.filter((b) =>
      b.genre?.toLowerCase().includes(selectedGenre.toLowerCase())
    );
  }

  if (recommendedFilter === "Top Rated")
    filteredBooks = filteredBooks
      .filter((b) => b.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating);

  if (recommendedFilter === "Editor's Picks")
    filteredBooks = filteredBooks.filter((b) => b.rating >= 4.0);

  if (recommendedFilter === "Trending")
    filteredBooks = filteredBooks.sort(() => Math.random() - 0.5);

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

  // TEXT HIGHLIGHTER
  const highlight = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  // SEARCH FILTER (debounced value already coming)
  if (searchQuery.trim() !== "") {
    filteredBooks = filteredBooks.filter((b) =>
      (b.title + " " + b.author)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }

  const displayedBooks = filteredBooks.slice(0, visibleCount);

  /* =======================================================
     FETCH BOOKS FROM BACKEND
  ======================================================= */
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/books/");
        setBooks(res.data);
      } catch (e) {
        console.log("Error fetching books", e);
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
    searchQuery,
  ]);

  return (
    <>
      {/* ===== HERO CAROUSEL ===== */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              className="d-block w-100 hero-image"
              alt=""
            />
            <div className="carousel-caption">
              <h5>Explore Endless Stories</h5>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              className="d-block w-100 hero-image"
              alt=""
            />
            <div className="carousel-caption">
              <h5>Discover New Worlds</h5>
            </div>
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* ===== CATEGORY BAR ===== */}
      <div className="category-bar shadow-sm">
        <div className="container d-flex justify-content-between py-3">

          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">Genre</span>
            <ul className="dropdown-menu">
              {["General", "History", "Fiction", "Religion"].map((g) => (
                <li key={g}><span className="dropdown-item" onClick={() => setSelectedGenre(g)}>{g}</span></li>
              ))}
              <li><span className="dropdown-item" onClick={() => setSelectedGenre("All")}>Show All</span></li>
            </ul>
          </div>

          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">Recommended</span>
            <ul className="dropdown-menu">
              {["Top Rated", "Editor's Picks", "Trending"].map((r) => (
                <li key={r}><span className="dropdown-item" onClick={() => setRecommendedFilter(r)}>{r}</span></li>
              ))}
              <li><span className="dropdown-item" onClick={() => setRecommendedFilter("None")}>Show All</span></li>
            </ul>
          </div>

          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">Language</span>
            <ul className="dropdown-menu">
              {["English", "Hindi", "Gujarati"].map((l) => (
                <li key={l}><span className="dropdown-item" onClick={() => setSelectedLanguage(l)}>{l}</span></li>
              ))}
              <li><span className="dropdown-item" onClick={() => setSelectedLanguage("All")}>Show All</span></li>
            </ul>
          </div>

          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">Author</span>
            <ul className="dropdown-menu">
              {fixedAuthorList.map((a) => (
                <li key={a}><span className="dropdown-item" onClick={() => setSelectedAuthor(a)}>{a}</span></li>
              ))}
              <li><hr /></li>
              <li><span className="dropdown-item" onClick={() => setSelectedAuthor("All")}>Show All</span></li>
            </ul>
          </div>

        </div>
      </div>

      {/* ===== BOOK RESULTS ===== */}
      <div className="container mt-4">
        <h2 className="section-title">Now Trending</h2>

        {loading && <p>Loading…</p>}

        {!loading && filteredBooks.length === 0 && (
          <div className="no-results-box mt-5">
            <h4>No books found</h4>
            <p>Try adjusting filters or typing something else.</p>
          </div>
        )}

        <div className="row g-4 mt-3">
          {displayedBooks.map((b) => (
            <div className="col-6 col-md-3" key={b.id}>
              <div className="book-card" onClick={() => (window.location.href = `/book/${b.id}`)}>
                <img src={b.image} alt={b.title} />
                <div className="book-info">
                  <h5 dangerouslySetInnerHTML={{ __html: highlight(b.title, searchQuery) }}></h5>
                  <p dangerouslySetInnerHTML={{ __html: highlight(b.author, searchQuery) }}></p>
                  <p>₹{b.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

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
    </>
  );
}

export default Homepage;

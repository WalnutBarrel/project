import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function Homepage() {

  const placeholderBooks = Array(4).fill(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  // MUST be before using it
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [recommendedFilter, setRecommendedFilter] = useState("None");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("All");



const languageMap = {
  English: "en",
  Hindi: "hi",
  Gujarati: "gu",
};

const fixedAuthorList = [
  'EduGorilla Prep Experts',
  'Library of Congress',
  'R. Reginald',
  'Pasquale De Marco',
  'Carolyn Keene',
  'Rylie Dark',
  "Unknown"   // (optional)
];



  let filteredBooks = books;

// 1. filter by genre
if (selectedGenre !== "All") {
  filteredBooks = filteredBooks.filter(
    (book) => book.genre.toLowerCase().includes(selectedGenre.toLowerCase())
  );
}

// 2. filter by recommended
if (recommendedFilter === "Top Rated") {
  filteredBooks = filteredBooks
    .filter((book) => book.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);
}

// 3. filter by language
if (selectedLanguage !== "All") {
  const langCode = languageMap[selectedLanguage]; // convert label → code

  filteredBooks = filteredBooks.filter(
    (book) =>
      book.language &&
      book.language.toLowerCase().startsWith(langCode) // match "en", "hi", "gu"
  );
}

// 4. filter by author
if (selectedAuthor !== "All") {
  filteredBooks = filteredBooks.filter(
    (book) =>
      book.author &&
      book.author.toLowerCase() === selectedAuthor.toLowerCase()
  );
}




if (recommendedFilter === "Editor's Picks") {
  filteredBooks = filteredBooks.filter((book) => book.rating >= 4.0);
}

if (recommendedFilter === "Trending") {
  filteredBooks = filteredBooks.sort(() => Math.random() - 0.5); // random shuffle
}


  const displayedBooks = filteredBooks.slice(0, visibleCount);





  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/books/");
      setBooks(response.data);
      
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);


useEffect(() => {
  setVisibleCount(8); // reset when genre changes
}, [selectedGenre]);

useEffect(() => {
  setVisibleCount(8);
}, [recommendedFilter]);

useEffect(() => {
  setVisibleCount(8);
}, [selectedLanguage]);

useEffect(() => {
  setVisibleCount(8);
}, [selectedAuthor]);




  

  return (
    <>
      {/* HERO SLIDER */}
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

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* CATEGORY BAR — BELOW SLIDER */}
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
  <li><span className="dropdown-item" onClick={() => setRecommendedFilter("Trending")}>Trending Now</span></li>
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
    {fixedAuthorList.map((auth, idx) => (
      <li key={idx}>
        <span
          className="dropdown-item"
          onClick={() => setSelectedAuthor(auth)}
        >
          {auth}
        </span>
      </li>
    ))}

    <li><hr className="dropdown-divider" /></li>

    <li>
      <span
        className="dropdown-item"
        onClick={() => setSelectedAuthor("All")}
      >
        Show All
      </span>
    </li>
  </ul>
</div>


        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mt-4">
        <h2 className="section-title">Now Trending</h2>
<div className="row g-4 mt-3">
  {loading && <p>Loading books...</p>}

  {!loading && books.length === 0 && <p>No books available</p>}

  {!loading &&
    displayedBooks.map((book) => (
      <div className="col-6 col-md-3" key={book.id}>
        <div
  className="book-card"
  onClick={() => window.location.href = `/book/${book.id}`}
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
{visibleCount < books.length && (
  <div className="text-center mt-3">
    <button
      className="btn btn-outline-primary"
      onClick={() => setVisibleCount(visibleCount + 8)}
    >
      Load More
    </button>
  </div>
)}

{visibleCount > 8 && (
  <div className="text-center mt-2">
    <button
      className="btn btn-outline-secondary"
      onClick={() => setVisibleCount(8)}
    >
      Show Less
    </button>
  </div>
)}


</div>


        <h2 className="section-title mt-5">Best Sellers</h2>
        <div className="row g-4 mt-3">
          {placeholderBooks.map((_, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="book-card">
                <img src={`https://picsum.photos/200/300?blur=${i + 2}`} />
                <div className="book-info">
                  <h5>Top Seller {i + 1}</h5>
                  <p>Popular Author</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      
    </>
  );
}

export default Homepage;

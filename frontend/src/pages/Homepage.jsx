import React from "react";
import "../App.css"; // or create a dedicated homepage.css if you want
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function Homepage() {
  const placeholderBooks = Array(4).fill(null);

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* HERO SECTION / SLIDER */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              className="d-block w-100"
              alt="Bookshelf"
            />
            <div className="carousel-caption">
              <h5>Explore Endless Stories</h5>
              <p>Find books that inspire and ignite your imagination.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              className="d-block w-100"
              alt="Reading"
            />
            <div className="carousel-caption">
              <h5>Discover New Worlds</h5>
              <p>Immerse yourself in bestsellers and hidden gems alike.</p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mt-5">
        <h2 className="section-title">Now Trending</h2>
        <div className="row g-4 mt-3">
          {placeholderBooks.map((_, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="book-card">
                <img
                  src={`https://picsum.photos/200/300?random=${index + 1}`}
                  alt="Book"
                />
                <div className="book-info">
                  <h5>Book Title {index + 1}</h5>
                  <p>Author Name</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title">Best Sellers</h2>
        <div className="row g-4 mt-3">
          {placeholderBooks.map((_, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="book-card">
                <img
                  src={`https://picsum.photos/200/300?blur=${index + 2}`}
                  alt="Book"
                />
                <div className="book-info">
                  <h5>Top Seller {index + 1}</h5>
                  <p>Famous Author</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default Homepage;

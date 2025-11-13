import React from "react";
import "../App.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function Homepage() {
  const placeholderBooks = Array(4).fill(null);

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
              <li><a className="dropdown-item">Fiction</a></li>
              <li><a className="dropdown-item">Romance</a></li>
              <li><a className="dropdown-item">Sci-Fi</a></li>
              <li><a className="dropdown-item">Thriller</a></li>
            </ul>
          </div>

          {/* RECOMMENDED */}
          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Recommended
            </span>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item">Top Rated</a></li>
              <li><a className="dropdown-item">Editor's Picks</a></li>
              <li><a className="dropdown-item">Trending Now</a></li>
            </ul>
          </div>

          {/* LANGUAGE */}
          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Language
            </span>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item">English</a></li>
              <li><a className="dropdown-item">Hindi</a></li>
              <li><a className="dropdown-item">Gujarati</a></li>
            </ul>
          </div>

          {/* AGE */}
          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Age
            </span>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item">Kids</a></li>
              <li><a className="dropdown-item">Teens</a></li>
              <li><a className="dropdown-item">Adults</a></li>
            </ul>
          </div>

          {/* PUBLISHER */}
          <div className="dropdown category-item">
            <span className="dropdown-toggle" data-bs-toggle="dropdown">
              Publisher
            </span>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item">Penguin</a></li>
              <li><a className="dropdown-item">HarperCollins</a></li>
              <li><a className="dropdown-item">Scholastic</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mt-4">
        <h2 className="section-title">Now Trending</h2>
        <div className="row g-4 mt-3">
          {placeholderBooks.map((_, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="book-card">
                <img src={`https://picsum.photos/200/300?random=${i}`} />
                <div className="book-info">
                  <h5>Book {i + 1}</h5>
                  <p>Author Name</p>
                </div>
              </div>
            </div>
          ))}
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

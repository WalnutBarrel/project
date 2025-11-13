import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookDetails.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function BookDetails() {
  const navigate = useNavigate();

  // Mock data (will be replaced by DB API response)
  const book = {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.7,
    price: 399,
    genre: "Thriller / Mystery",
    pages: 336,
    language: "English",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
    description:
      "A shocking psychological thriller about a woman's act of violence against her husband—and the therapist obsessed with uncovering her motive. A gripping, twist-filled story you won't forget.",
  };

  return (
    <div className="container book-details-page">
      <div className="row mt-5">
        {/* Cover Section */}
        <div className="col-md-4 text-center">
          <img src={book.cover} alt="Book Cover" className="book-cover shadow-lg" />
        </div>

        {/* Details Section */}
        <div className="col-md-8">
          <h1 className="fw-bold text-primary">{book.title}</h1>
          <p className="text-muted fs-5">by {book.author}</p>

          <div className="rating-box">
            ⭐ {book.rating} / 5
          </div>

          <h3 className="price mt-3">₹ {book.price}</h3>

          <p className="text-dark mt-4">{book.description}</p>

          <div className="detail-meta mt-4">
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Language:</strong> {book.language}</p>
          </div>

          {/* Buttons */}
          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-danger px-4">Buy Now</button>
            <button className="btn btn-outline-warning px-4">Add to Cart</button>
            <button
              className="btn btn-outline-secondary px-4"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to fetch book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading Book...</p>;
  if (!book) return <p className="text-center mt-5">Book not found</p>;

const addToCart = (book) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if book already in cart
  const existing = cart.find((item) => item.id === book.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Book added to cart!");
};



  return (
    <>
    
      <div className="container book-details-page">
        <div className="row mt-5">
          
          {/* Cover Section */}
          <div className="col-md-4 text-center">
            <img src={book.image} alt={book.title} className="book-cover shadow-lg" />
          </div>

          {/* Details Section */}
          <div className="col-md-8">
            <h1 className="fw-bold text-primary">{book.title}</h1>
<p className="text-muted fs-5">by {book.author}</p>

<div className="rating-box mt-2">
  ⭐ {book.rating} / 5
</div>

<h3 className="price mt-3">₹ {book.price}</h3>

<p className="text-dark mt-4">{book.description}</p>

<div className="detail-meta mt-4">
  <p><strong>Genre:</strong> {book.genre}</p>
</div>


            {/* Buttons */}
            <div className="mt-4 d-flex gap-3">
              <button className="btn btn-danger px-4">Buy Now</button>
              <button
  className="btn btn-outline-warning px-4"
  onClick={() => addToCart(book)}
>
  Add to Cart
</button>

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
      
    </>
  );
}

export default BookDetails;

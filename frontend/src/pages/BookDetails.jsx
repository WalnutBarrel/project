import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetails.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Swal from "sweetalert2";


function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // FALLBACK BOOKS (same as Homepage)
const fallbackBooks = [
  {
    id: "f1",
    title: "The Great Adventure",
    author: "John Writer",
    price: 199,
    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    genre: "Fiction",
    rating: 4.3,
    description: "An action-packed journey through mysterious lands.",
  },
  {
    id: "f2",
    title: "History of the World",
    author: "Anna Stone",
    price: 299,
    image: "https://images.unsplash.com/photo-1544936207-710633d84635",
    genre: "History",
    rating: 4.5,
    description: "A detailed history of civilizations across centuries.",
  },
  {
    id: "f3",
    title: "Mystery House",
    author: "Lia Carter",
    price: 150,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    genre: "Fiction",
    rating: 4.0,
    description: "A thrilling story of puzzles and hidden secrets.",
  },
  {
    id: "f4",
    title: "Religious Teachings",
    author: "Swami Dev",
    price: 180,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    genre: "Religion",
    rating: 4.1,
    description: "Inspirational teachings from ancient scriptures.",
  },
];


  useEffect(() => {
  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
      setBook(res.data);   // backend book
    } catch (err) {
      console.log("Backend unavailable → using fallback");

      // find fallback book matching id
      const offlineBook = fallbackBooks.find((b) => b.id === id);

      if (offlineBook) {
        setBook(offlineBook);
      } else {
        setBook(null); // not found anywhere
      }
    } finally {
      setLoading(false);
    }
  };

  fetchBook();
}, [id]);


  if (loading) {
  return (
    <div className="container book-details-page mt-5">
      <div className="row">
        
        {/* Image skeleton */}
        <div className="col-md-4">
          <div className="book-loader loader-img"></div>
        </div>

        {/* Text skeleton */}
        <div className="col-md-8">
          <div className="book-loader loader-title"></div>
          <div className="book-loader loader-author"></div>
          <div className="book-loader loader-desc"></div>
        </div>

      </div>
    </div>
  );
}

  if (!book) return <p className="text-center mt-5">Book not found</p>;

const addToCart = (book) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === book.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // SweetAlert success popup
  Swal.fire({
    icon: "success",
    title: "Added to Cart!",
    text: `${book.title} has been added to your cart.`,
    showConfirmButton: false,
    timer: 1500,
  });
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

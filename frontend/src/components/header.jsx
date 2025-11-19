import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { User, LogIn, ListOrdered, ShoppingCart } from "lucide-react";
import axios from "axios";
import "./HeaderFooter.css";

const Header = ({ searchQuery, setSearchQuery, darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  // 🔍 Search Suggestions
  const [allBooks, setAllBooks] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Fetch books once
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/books/")
      .then(res => setAllBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchQuery.trim()) return setSuggestions([]);

    const filtered = allBooks.filter(b =>
      (b.title + " " + b.author).toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 6));
  }, [searchQuery]);

  // Cart count update
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [location.pathname]);

  const isAuthPage = location.pathname === "/login";

  return (
    <header className="header">

      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Logo" />
        <span>Beyond Bound Pages</span>
      </div>

      {/* HIDE SEARCH ON LOGIN PAGE */}
      {!isAuthPage && (
        <>
          {/* 🔍 SEARCH BAR */}
          <div className="search-container">
            <input
              type="text"
              className="search"
              placeholder="Search by Title or Author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* SUGGESTION BOX */}
            {searchQuery && (
              <div className="suggestion-box">
                {suggestions.length > 0 ? (
                  suggestions.map((book) => (
                    <div
                      key={book.id}
                      className="suggestion-item"
                      onClick={() => navigate(`/book/${book.id}`)}
                    >
                      <img src={book.image} alt="cover" />
                      <span>{book.title}</span>
                    </div>
                  ))
                ) : (
                  <div className="suggestion-item empty">No books found</div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT ICONS */}
          <div className="header-right">

            {/* CART */}
            <div className="icon-btn" onClick={() => navigate("/checkout")} title="Cart">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>

            {/* ORDERS */}
            <div className="icon-btn" onClick={() => navigate("/my-orders")} title="My Orders">
              <ListOrdered size={22} />
            </div>

            {/* PROFILE */}
            <div className="icon-btn" onClick={() => navigate("/profile")} title="Profile">
              <User size={22} />
            </div>

            {/* LOGIN */}
            <div className="icon-btn" onClick={() => navigate("/login")} title="Login">
              <LogIn size={22} />
            </div>

            {/* THEME */}
            <div className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "🌙" : "☀️"}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

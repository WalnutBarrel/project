import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import "./HeaderFooter.css";

const Header = ({ searchQuery, setSearchQuery, darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  // Update cart count
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [location.pathname]);

  // Hide header on login page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Logo" />
        <span>Beyond Bound Pages</span>
      </div>

      {/* HIDE search + items on login */}
      {!isAuthPage && (
        <>
          {/* Search */}
          <input
            type="text"
            className="search"
            placeholder="Search by Title or Author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="header-right">
            {/* CART */}
            <div className="cart-wrapper" onClick={() => navigate("/checkout")}>
              <img src={cart} alt="Cart" className="cart-icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>

            {/* THEME TOGGLE */}
            <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? "☀️" : "🌙"}
</button>



            {/* LOGIN BUTTON */}
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

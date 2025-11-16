import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import "./HeaderFooter.css";

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header on /login or /register
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // ⭐ CART COUNT STATE
  const [cartCount, setCartCount] = useState(0);

  // ⭐ Update cart count whenever cart changes
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cartData.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  }, [location]); // refresh when route changes

  return (
    <header className="header">
      {/* Logo */}
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Logo" />
        <span>Beyond Bound Pages</span>
      </div>

      {/* Hide on login/register */}
      {!isAuthPage && (
        <>
          {/* SEARCH BAR */}
          <input
            type="text"
            className="search"
            placeholder="Search by Title or Author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="header-right">

            {/* CART ICON */}
            <div
              className="cart-wrapper"
              onClick={() => navigate("/checkout")}
              style={{ cursor: "pointer" }}
            >
              <img src={cart} alt="Cart" className="cart-icon" />

              {/* ⭐ BADGE */}
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>

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

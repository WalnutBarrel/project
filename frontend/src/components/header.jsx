import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import "./HeaderFooter.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check if current page is login/register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="header">
      {/* Logo (clickable → Homepage) */}
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Logo" />
        <span>Beyond Bound Pages</span>
      </div>

      {/* Show only on non-auth pages */}
      {!isAuthPage && (
        <>
          <input
            type="text"
            className="search"
            placeholder="Search by Title or Author"
          />

          <div className="header-right">
            {/* Cart icon (navigates to checkout page) */}
            <img
              src={cart}
              alt="Cart"
              className="cart-icon"
              onClick={() => navigate("/checkout")}
              style={{ cursor: "pointer" }}
              title="Go to Cart"
            />

            {/* Login button */}
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

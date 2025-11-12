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
      {/* Logo */}
      <div className="logo">
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
            <img src={cart} alt="Cart" className="cart-icon" />
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

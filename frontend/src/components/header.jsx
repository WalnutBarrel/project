import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import { User, LogIn, ListOrdered, ShoppingCart } from "lucide-react";
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
  <div className="icon-btn" onClick={() => navigate("/checkout")} title="My Orders">
    <ShoppingCart size={22} />
  </div>

  {/* My Orders */}
  <div className="icon-btn" onClick={() => navigate("/my-orders")} title="My Orders">
    <ListOrdered size={22} />
  </div>

  {/* Profile */}
  <div className="icon-btn" onClick={() => navigate("/profile")} title="Profile">
    <User size={22} />
  </div>

  {/* Login */}
  <div className="icon-btn" onClick={() => navigate("/login")} title="Login">
    <LogIn size={22} />
  </div>

  {/* Dark Mode Toggle */}
  <div className="theme-toggle-simple icon-btn" onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? "🌙" : "☀️"}
  </div>

</div>

        </>
      )}
    </header>
  );
};

export default Header;

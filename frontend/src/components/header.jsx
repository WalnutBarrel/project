import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import cart from "../assets/cart.svg";
import "./HeaderFooter.css";

const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
});


const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide header components on login/register pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="header">
      {/* Logo → Homepage */}
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Logo" />
        <span>Beyond Bound Pages</span>
      </div>

      {/* Only show on pages OTHER than login/register */}
      {!isAuthPage && (
        <>
          {/* ⭐ SEARCH BAR ⭐ */}
          <input
            type="text"
            className="search"
            placeholder="Search by Title or Author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="header-right">
            {/* Cart → Checkout */}
            <div className="cart-wrapper" onClick={() => navigate("/checkout")}>
  <img src={cart} alt="Cart" className="cart-icon" />

  {cartCount > 0 && (
    <span className="cart-badge">{cartCount}</span>
  )}
</div>


            {/* Login Button */}
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

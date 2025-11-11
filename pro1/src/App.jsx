import { useState } from 'react'
import logo from "./svg/logo.svg"
import cart from "./svg/cart.svg"
import facebook from "./svg/facebook.svg"
import instagram from "./svg/instagram.svg"
import linkedin from "./svg/linkedin.svg"
import './App.css'
import { useNavigate } from "react-router-dom";



function App() {
  const placeholderBooks = Array(4).fill(null);
  const navigate = useNavigate();



  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Beyond Bound Pages</span>
        </div>

        <input
          type="text"
          className="search"
          placeholder="Search by Title or Author"
        />

        <div className="header-right">
          <img src={cart} alt="Cart" />
          <button className="login-btn" onClick={() => navigate("/login")}>
  Login
</button>

        </div>
      </header>

      {/* MAIN CONTENT - LIMITED WIDTH */}
      <div className="container">

        <nav className="nav-menu">
  <div className="menu-item">
    Genre
    <div className="dropdown">
      <a href="#">Fiction</a>
      <a href="#">Non-Fiction</a>
      <a href="#">Romance</a>
      <a href="#">Thriller</a>
      <a href="#">Sci-Fi</a>
    </div>
  </div>

  <div className="menu-item">
    Recommended
    <div className="dropdown">
      <a href="#">Top Rated</a>
      <a href="#">Editor's Picks</a>
      <a href="#">New & Trending</a>
    </div>
  </div>

  <div className="menu-item">
    Language
    <div className="dropdown">
      <a href="#">English</a>
      <a href="#">Hindi</a>
      <a href="#">Gujarati</a>
    </div>
  </div>

  <div className="menu-item">
    Age
    <div className="dropdown">
      <a href="#">Kids</a>
      <a href="#">Teens</a>
      <a href="#">Adults</a>
    </div>
  </div>

  <div className="menu-item">
    Publisher
    <div className="dropdown">
      <a href="#">Penguin</a>
      <a href="#">HarperCollins</a>
      <a href="#">Scholastic</a>
    </div>
  </div>
</nav>


        <section className="section">
          <h2>Now Trending</h2>
          <div className="book-grid">
            {placeholderBooks.map((_, index) => (
              <div key={index} className="book-card"></div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Best Sellers</h2>
          <div className="book-grid">
            {placeholderBooks.map((_, index) => (
              <div key={index} className="book-card"></div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>New Arrivals</h2>
          <div className="book-grid">
            {placeholderBooks.map((_, index) => (
              <div key={index} className="book-card"></div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Discount</h2>
          <div className="book-grid">
            {placeholderBooks.map((_, index) => (
              <div key={index} className="book-card"></div>
            ))}
          </div>
        </section>
      </div> {/* END OF CONTAINER */}

      {/* FULL-WIDTH FOOTER */}
      <footer className="footer">

        <div className="footer-top">
          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Help</a>
          </div>

          <div className="social-icons">
            <img src={facebook} alt="Facebook" />
            <img src={instagram} alt="Instagram" />
            <img src={linkedin} alt="LinkedIn" />
          </div>
        </div>

        <p className="copyright">
          © 2025. Beyond Bound Pages.com. All Rights Reserved
        </p>

      </footer>
    </>
  );
}

export default App;

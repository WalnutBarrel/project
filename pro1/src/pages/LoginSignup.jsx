import { useState } from "react";
import "./auth.css";
import logo from "../svg/logo.svg";
import facebook from "../svg/facebook.svg";
import instagram from "../svg/instagram.svg";
import linkedin from "../svg/linkedin.svg";

export default function LoginSignup() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Beyond Bound Pages</span>
        </div>
      </header>

      {/* LOGIN + SIGNUP BOX */}
      <div className="login-container">
        <div className={`login-box ${showLogin ? "show-login" : "show-signup"}`}>
          <div className="form-wrapper">
            {/* LOGIN FORM */}
            <div className={`form login-form ${showLogin ? "active" : ""}`}>
              <h2>LOGIN</h2>
              <div className="line"></div>

              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />

              <button className="login-btn">Login</button>

              <p className="register-text">
                Don’t have an account?
                <span onClick={() => setShowLogin(false)}> Register</span>
              </p>
            </div>

            {/* SIGNUP FORM */}
            <div className={`form signup-form ${showLogin ? "" : "active"}`}>
              <h2>SIGN UP</h2>
              <div className="line"></div>

              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />

              <button className="login-btn">Register</button>

              <p className="register-text">
                Already have an account?
                <span onClick={() => setShowLogin(true)}> Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Help</a>
        </div>

        <div className="social-icons">
          <img src={facebook} alt="Facebook" />
          <img src={instagram} alt="Instagram" />
          <img src={linkedin} alt="LinkedIn" />
        </div>

        <p className="copyright">
          Copyright © 2025. Beyond Bound Pages.com. All Rights Reserved
        </p>
      </footer>
    </>
  );
}

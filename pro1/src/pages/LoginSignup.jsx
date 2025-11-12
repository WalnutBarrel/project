import { useState } from "react";
import logo from "../svg/logo.svg";
import facebook from "../svg/facebook.svg";
import instagram from "../svg/instagram.svg";
import linkedin from "../svg/linkedin.svg";
import "../pages/auth.css";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Beyond Bound Pages</span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="auth-main">
  {/* Floating background items */}
  <div className="floating-icons">
    <i className="bi bi-book book"></i>
    <i className="bi bi-pencil pencil"></i>
    <i className="bi bi-journal-text journal"></i>
    <i className="bi bi-pen pen"></i>
  </div>

  <div className={`auth-container ${isLogin ? "show-login" : "show-register"}`}>
    {/* LOGIN BOX */}
    <div className="login-box form-box">
      <h2>LOGIN</h2>
      <div className="line"></div>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="login-btn">Login</button>
      <p className="register-text">
        Don’t have an account?{" "}
        <span onClick={() => setIsLogin(false)}>Register</span>
      </p>
    </div>

    {/* REGISTER BOX */}
    <div className="register-box form-box">
      <h2>REGISTER</h2>
      <div className="line"></div>
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="login-btn">Register</button>
      <p className="register-text">
        Already have an account?{" "}
        <span onClick={() => setIsLogin(true)}>Login</span>
      </p>
    </div>
  </div>
</main>


      {/* FOOTER */}
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

export default LoginSignup;

import { useState } from "react";
import "./auth.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";


function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* Reusable Header */}
      <Header />

      {/* MAIN AUTH CONTAINER */}
      <main className="auth-main">
        {/* Floating background icons */}
        <div className="floating-icons">
          <i className="bi bi-book book"></i>
          <i className="bi bi-pencil pencil"></i>
          <i className="bi bi-journal-text journal"></i>
          <i className="bi bi-pen pen"></i>
        </div>

        {/* Login / Register Card */}
        <div
          className={`auth-container ${
            isLogin ? "show-login" : "show-register"
          }`}
        >
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

      {/* Reusable Footer */}
      <Footer />
    </>
  );
}

export default LoginSignup;

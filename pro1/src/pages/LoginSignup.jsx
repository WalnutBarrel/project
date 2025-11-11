import { useState } from "react";
import "./auth.css";

export default function LoginSignup() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    
    <div className="auth-page">



      {/* The form container */}
      <div className="auth-box">

        {/* SLIDER WRAPPER */}
        <div className={`form-slider ${showLogin ? "show-login" : "show-signup"}`}>

          {/* LOGIN FORM */}
          <div className="form login-form">
            <h2>LOGIN</h2>
            <div className="underline"></div>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="auth-btn">Login</button>

            <p className="switch-text">
              Don’t have an account?
              <span onClick={() => setShowLogin(false)}> Register</span>
            </p>
          </div>

          {/* SIGNUP FORM */}
          <div className="form signup-form">
            <h2>SIGN UP</h2>
            <div className="underline"></div>

            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="auth-btn">Sign Up</button>

            <p className="switch-text">
              Already have an account?
              <span onClick={() => setShowLogin(true)}> Login</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

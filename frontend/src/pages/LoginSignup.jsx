import { useState } from "react";
import "./auth.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import axios from "axios";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup Function
  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
        name,
        email,
        password,
      });
      alert(res.data.message);
      setIsLogin(true);
    } catch (err) {
      console.log(err);  
      alert(JSON.stringify(err.response?.data || err));

    }
  };

  // Login Function

const handleLogin = async () => {
  if (!email || !password) {
    alert("Email & password required");
    return;
  }

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login/", {
      email,
      password,
    });

    alert(res.data.message);

    // Save whole user
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // ⭐ Save ONLY the user_id for orders
    localStorage.setItem("user_id", res.data.user.id);

    // redirect
    window.location.href = "/";
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <>
      <Header />

      <main className="auth-main">
        <div className="floating-icons">
          <i className="bi bi-book book"></i>
          <i className="bi bi-pencil pencil"></i>
          <i className="bi bi-journal-text journal"></i>
          <i className="bi bi-pen pen"></i>
        </div>

        <div
          className={`auth-container ${
            isLogin ? "show-login" : "show-register"
          }`}
        >
          {/* LOGIN BOX */}
          <div className="login-box form-box">
            <h2>LOGIN</h2>
            <div className="line"></div>

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>

            <p className="register-text">
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Register</span>
            </p>
          </div>

          {/* REGISTER BOX */}
          <div className="register-box form-box">
            <h2>REGISTER</h2>
            <div className="line"></div>

            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" onClick={handleSignup}>
              Register
            </button>

            <p className="register-text">
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default LoginSignup;

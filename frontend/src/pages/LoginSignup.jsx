import { useState } from "react";
import "./auth.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import axios from "axios";
import Swal from "sweetalert2";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup Function
  const handleSignup = async () => {
    if (!name || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Details",
        text: "All fields are required!",
      });
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
        name,
        email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      setIsLogin(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  // Login Function
  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Details",
        text: "Email & Password are required!",
      });
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("user_id", res.data.user.id);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/";
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Incorrect email or password",
      });
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

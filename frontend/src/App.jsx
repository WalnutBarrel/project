import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import About from "./pages/About.jsx";
import Help from "./pages/Help.jsx";
import Checkout from "./pages/Checkout.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import "./App.css";

function App() {
  const location = useLocation();

  // Hide header/footer for login page
  const hideHeaderFooterPaths = ["/login"];
  const hideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);

  // Global search state
  const [searchQuery, setSearchQuery] = useState("");

  // 🌙 Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🌙 Apply theme to <body>
  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  localStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);


  return (
    <>
      {/* Header (hidden on /login) */}
      {!hideHeaderFooter && (
        <Header
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>

      )}

      <Routes>
        <Route
          path="/"
          element={<Homepage searchQuery={searchQuery} />}
        />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>

      {/* Footer (hidden on /login) */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;

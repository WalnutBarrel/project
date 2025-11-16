import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
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

  // hide header/footer for login page
  const hideHeaderFooterPaths = ["/login"];
  const hideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);

  // ⭐ Search State (LIFTED UP)
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Header (hidden on /login) */}
      {!hideHeaderFooter && (
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
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

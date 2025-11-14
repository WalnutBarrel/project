import { Routes, Route, useLocation } from "react-router-dom";
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
  const hideHeaderFooterPaths = ["/login"];
  const hideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {/* Header (hidden on /login) */}
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Homepage />} />
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

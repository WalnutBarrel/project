import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import "./App.css";

function App() {
  const location = useLocation();
  const hideHeaderFooterPaths = ["/login"];
  const hideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;

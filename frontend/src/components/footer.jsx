import React from "react";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import linkedin from "../assets/linkedin.svg";
import "./HeaderFooter.css"; // same shared css file

const Footer = () => {
  return (
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
  );
};

export default Footer;

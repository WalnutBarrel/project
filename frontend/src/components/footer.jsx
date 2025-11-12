import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import linkedin from "../assets/linkedin.svg";
import "./HeaderFooter.css";

const Footer = () => {
  return (
    <footer className="modern-footer text-white py-5 mt-5">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* Left Section */}
          <Col md={6} className="mb-4 mb-md-0">
            <h5 className="fw-bold">Beyond Bound Pages</h5>
            <p className="small text-light">
              Your one-stop online book hub — discover, explore, and shop stories from across the world.
            </p>
          </Col>

          {/* Right Section */}
          <Col md={6}>
            <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-4">
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/help" className="footer-link">Help</Link>

              <div className="social-icons d-flex gap-3">
                <a href="#"><img src={facebook} alt="Facebook" /></a>
                <a href="#"><img src={instagram} alt="Instagram" /></a>
                <a href="#"><img src={linkedin} alt="LinkedIn" /></a>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-light opacity-25" />

        <p className="text-center small mb-0">
          © 2025 <strong>Beyond Bound Pages</strong>. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

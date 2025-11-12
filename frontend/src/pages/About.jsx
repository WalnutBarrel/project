import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./About.css";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function About() {
  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary mb-3">About Beyond Bound Pages</h1>
        <p className="text-muted fs-5">
          Where stories come alive — and imagination knows no bounds.
        </p>
      </div>

      {/* Mission Section */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Our Mission"
            className="img-fluid rounded shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h2 className="fw-bold text-secondary">Our Mission</h2>
          <p className="mt-3 text-muted">
            At <strong>Beyond Bound Pages</strong>, we aim to bring readers and
            stories closer than ever. Whether you love timeless classics or
            modern tales, our mission is to make reading more accessible and
            exciting for everyone.
          </p>
        </Col>
      </Row>

      {/* Team Section */}
      <h2 className="fw-bold text-secondary text-center mb-4">Meet Our Team</h2>
      <Row className="g-4 text-center">
        {[
          { name: "Meera Patel", role: "Founder & CEO" },
          { name: "Rohan Singh", role: "Marketing Lead" },
          { name: "Aisha Khan", role: "Content Curator" },
        ].map((member, index) => (
          <Col md={4} key={index}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Img
                variant="top"
                src={`https://randomuser.me/api/portraits/${
                  index % 2 === 0 ? "women" : "men"
                }/${index + 10}.jpg`}
                className="rounded-top"
              />
              <Card.Body>
                <Card.Title className="fw-semibold">{member.name}</Card.Title>
                <Card.Text className="text-muted">{member.role}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Closing Section */}
      <div className="text-center mt-5">
        <h4 className="fw-semibold text-dark">
          “A reader lives a thousand lives before he dies.” – George R.R. Martin
        </h4>
        <p className="text-muted mt-3">
          Join us in our journey to make every page turn an adventure!
        </p>
      </div>
    </Container>
  );
}

export default About;

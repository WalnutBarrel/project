import React from "react";
import { Container, Row, Col, Accordion, Form, Button } from "react-bootstrap";
import "./Help.css";

function Help() {
  return (
    <div className="help-page py-5">
      <Container>
        {/* Title Section */}
        <div className="text-center mb-5">
          <h1 className="gradient-text">Need Help?</h1>
          <p className="text-muted fs-5">
            We’re here to answer your questions and make your reading journey smoother.
          </p>
        </div>

        {/* FAQ Section */}
        <Row className="justify-content-center mb-5">
          <Col md={8}>
            <h3 className="fw-semibold mb-4 text-secondary text-center">Frequently Asked Questions</h3>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>How do I create an account?</Accordion.Header>
                <Accordion.Body>
                  Click on the “Login” button in the top right corner and select “Register”.
                  Fill in your details to get started instantly.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Can I track my book orders?</Accordion.Header>
                <Accordion.Body>
                  Yes, after logging in, you can visit your profile dashboard and view your recent orders and shipment status.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>How can I contact support?</Accordion.Header>
                <Accordion.Body>
                  You can use the contact form below or email us directly at{" "}
                  <strong>support@beyondboundpages.com</strong>.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Do you offer digital books?</Accordion.Header>
                <Accordion.Body>
                  Absolutely! We have a collection of eBooks available for download and online reading.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        {/* Contact Form */}
        <Row className="justify-content-center">
          <Col md={8}>
            <h3 className="fw-semibold text-secondary text-center mb-4">Still Need Help?</h3>
            <div className="help-form p-4 rounded shadow-sm">
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="message">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="How can we help you?" required />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" className="px-4 py-2 rounded-pill fw-semibold">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Help;

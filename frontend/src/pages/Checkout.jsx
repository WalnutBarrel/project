import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="checkout-page py-5">
      <Container>
        {/* Page Title */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-gradient">Checkout</h1>
          <p className="text-muted fs-5">
            Complete your purchase and get your favorite books delivered.
          </p>
        </div>

        <Row>
          {/* LEFT — Shipping Info */}
          <Col md={7}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <h4 className="fw-semibold text-secondary mb-4">Shipping Details</h4>
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="John" required />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Doe" required />
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="example@email.com" required />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="123 Main St" required />
                  </Form.Group>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" placeholder="Mumbai" required />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control type="text" placeholder="400001" required />
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="+91 98765 43210" required />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            {/* Payment Info */}
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="fw-semibold text-secondary mb-4">Payment Method</h4>
                <Form>
                  <Form.Check
                    type="radio"
                    label="Credit / Debit Card"
                    name="payment"
                    defaultChecked
                    className="mb-2"
                  />
                  <Form.Check type="radio" label="UPI / Net Banking" name="payment" className="mb-2" />
                  <Form.Check type="radio" label="Cash on Delivery" name="payment" />
                </Form>

                <div className="text-center mt-4">
                  <Button variant="primary" className="px-4 py-2 rounded-pill fw-semibold">
                    Place Order
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT — Order Summary (REAL CART ITEMS) */}
          <Col md={5}>
            <Card className="shadow-sm border-0 sticky-md-top">
              <Card.Body>
                <h4 className="fw-semibold text-secondary mb-4">Order Summary</h4>

                {cart.length === 0 && <p>Your cart is empty.</p>}

                {cart.map((item) => (
                  <div className="order-item d-flex align-items-center mb-3" key={item.id}>
                    <img src={item.image} alt={item.title} className="order-img me-3" />

                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-semibold">{item.title}</h6>
                      <p className="text-muted small mb-1">₹{item.price}</p>

                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => decreaseQty(item.id)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => increaseQty(item.id)}
                        >
                          +
                        </button>

                        <button
                          className="btn btn-sm btn-danger ms-3"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>

                <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;

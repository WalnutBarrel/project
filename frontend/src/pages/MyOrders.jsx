import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/orders/user/${user_id}/`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (user_id) fetchOrders();
  }, [user_id]);

  if (!user_id) {
    return <h2 className="text-center mt-5">Please login to view your orders.</h2>;
  }

  return (
    <div className="orders-page container mt-5">
      <h2 className="orders-title">📚 My Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <h4>Order #{order.id}</h4>
          <p><strong>Total:</strong> ₹{order.total}</p>
          <p><strong>Payment:</strong> {order.payment_method}</p>
          <p><strong>Status:</strong> <span className="status-badge">Pending</span></p>

          <div className="order-items">
            {order.items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.book.image} alt={item.book.title} />
                <div>
                  <p className="item-title">{item.book.title}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;

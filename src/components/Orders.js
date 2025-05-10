import React from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";

const Orders = ({ orders }) => {
  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center py-5">
          <h4>No orders found</h4>
          <p className="text-muted">
            Your orders will appear here once you make a purchase
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <Card key={order.orderId} className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <span className="me-3">Order ID: #{order.orderId}</span>
                <Badge
                  bg={order.status === "Delivered" ? "success" : "warning"}
                >
                  {order.status}
                </Badge>
              </div>
              <small className="text-muted">{order.date}</small>
            </Card.Header>

            <ListGroup variant="flush">
              {order.items.map((item) => (
                <ListGroup.Item
                  key={item.title}
                  className="d-flex align-items-center"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "60px",
                      height: "80px",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.title}</h6>
                    <div className="d-flex justify-content-between">
                      <span>Quantity: {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}

              <ListGroup.Item className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Shipping Details</h6>
                    <p className="mb-0">
                      {order.shippingDetails.name}
                      <br />
                      {order.shippingDetails.address}
                      <br />
                      Phone: {order.shippingDetails.phone}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Payment Method</h6>
                    <p className="mb-0">
                      {order.paymentMethod}
                      <br />
                      {order.paymentMethod === "bank" &&
                        `Receipt: ${order.receipt?.name}`}
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      )}
    </div>
  );
};

export default Orders;

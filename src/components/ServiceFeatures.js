import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Cash, CreditCard, ShieldCheck, Truck } from "react-bootstrap-icons";

const ServiceFeatures = () => {
  const features = [
    {
      icon: <Truck size={32} className="text-primary mb-3" />,
      title: "Pick-up In-store",
      text: "Order online and collect from our warehouse on the same day!",
    },
    {
      icon: <Cash size={32} className="text-primary mb-3" />,
      title: "Free Delivery",
      text: "If your order value is above Rs.5,000, delivery is free throughout Sri Lanka.",
    },
    {
      icon: <CreditCard size={32} className="text-primary mb-3" />,
      title: "COD & Online Payments",
      text: "From Cash-on-delivery to online payments, we accept all popular payment methods.",
    },
    {
      icon: <ShieldCheck size={32} className="text-primary mb-3" />,
      title: "100% Authentic",
      text: "We only sell authentic products that are directly sourced from publishers.",
    },
  ];

  return (
    <div className="bg-light w-100 py-5">
      <Container>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col
              key={index}
              md={3}
              className="d-flex flex-column align-items-center text-center border-end border-secondary"
              style={{
                minHeight: "200px",
                ...(index === features.length - 1 && { borderRight: "none" }),
              }}
            >
              <div className="mb-2" aria-hidden="true">
                {feature.icon}
              </div>
              <h5
                className="mb-3"
                style={{
                  fontFamily: "'Arial', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {feature.title}
              </h5>
              <p
                className="mb-0 px-3"
                style={{
                  fontFamily: "'Arial', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  color: "#666",
                }}
              >
                {feature.text}
              </p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ServiceFeatures;

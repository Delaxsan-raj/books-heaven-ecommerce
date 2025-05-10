import React, { useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const book = {
  title: "Source Code: My Beginnings",
  author: "Bill Gates",
  price: 10690.0,
  image: "/images/fault.png",
  releaseDate: "April 21, 2025",
  description: `Bill Gates is one of the most transformative figures of our age...`,
  details: {
    isbn: "9780241736678",
    publisher: "Allen Lane",
    publishDate: "February 2025",
    pages: 336,
    binding: "Hardcover",
  },
  relatedProducts: [
    { title: "DAVWORD TO YOUR LIFE", stock: 6 },
    { title: "PRINCIPLES RAY DAILO", stock: 4 },
    { title: "An Malaiá", stock: 1 },
  ],
};

const BookDetails = ({ onAddToCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    onAddToCart(book);
    setAddedToCart(true);
    alert(`Added ${book.title} to cart!`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="my-5 flex-grow-1">
        <Button
          variant="outline-secondary"
          onClick={() => navigate(-1)}
          className="mb-4 rounded-pill px-4"
        >
          &lt; Back to Books
        </Button>

        <Row className="g-5 mb-5">
          <Col md={4}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Img
                variant="top"
                src={book.image}
                alt={book.title}
                className="p-4"
                style={{ objectFit: "contain", maxHeight: "500px" }}
              />
              <Card.Body className="bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="text-primary mb-0">
                    Rs. {book.price.toFixed(2)}
                  </h2>
                  <Badge bg="success" className="fs-6">
                    Pre-order
                  </Badge>
                </div>
                <p className="text-muted small mb-4">
                  3 X Rs. {(book.price / 3).toFixed(2)} with texto
                  <br />
                  Available: {book.releaseDate}
                </p>
                <Button
                  variant={addedToCart ? "success" : "primary"}
                  size="lg"
                  className="w-100 rounded-pill py-3 fw-bold"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <div className="d-flex flex-column h-100">
              <h1 className="display-4 mb-3 fw-bold">{book.title}</h1>
              <h3 className="text-muted mb-4">By {book.author}</h3>

              <Card className="mb-4 shadow-sm border-0">
                <Card.Header className="bg-primary text-white fs-5 py-3">
                  Product Details
                </Card.Header>
                <Card.Body className="p-4">
                  <Row>
                    <Col md={6}>
                      <dl className="mb-4">
                        <dt className="text-muted small">ISBN-13</dt>
                        <dd className="fs-5">{book.details.isbn}</dd>
                      </dl>
                      <dl className="mb-4">
                        <dt className="text-muted small">Publisher</dt>
                        <dd className="fs-5">{book.details.publisher}</dd>
                      </dl>
                    </Col>
                    <Col md={6}>
                      <dl className="mb-4">
                        <dt className="text-muted small">Publication Date</dt>
                        <dd className="fs-5">{book.details.publishDate}</dd>
                      </dl>
                      <dl className="mb-4">
                        <dt className="text-muted small">Binding</dt>
                        <dd className="fs-5">{book.details.binding}</dd>
                      </dl>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="mb-5 shadow-sm border-0">
                <Card.Body className="p-4">
                  <h4 className="mb-4">Description</h4>
                  <p
                    className="lead text-muted lh-lg"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {book.description}
                  </p>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        <section>
          <h3 className="mb-4 fw-bold">Related Products</h3>
          <Row className="g-4">
            {book.relatedProducts.map((product, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 shadow-sm border-0 hover-effect">
                  <Card.Body className="p-4">
                    <Card.Title className="mb-3">{product.title}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center">
                      <Badge
                        bg={
                          product.stock === 0
                            ? "danger"
                            : product.stock <= 3
                            ? "warning"
                            : "success"
                        }
                        className="fs-6"
                      >
                        {product.stock === 0
                          ? "Out of Stock"
                          : product.stock <= 3
                          ? "Low Stock"
                          : "In Stock"}
                      </Badge>
                      <span className="text-muted small">
                        {product.stock} available
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default BookDetails;

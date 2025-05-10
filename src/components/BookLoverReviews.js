import React, { useState } from "react";
import { Button, Carousel, Col, Form, Modal, Row } from "react-bootstrap";
import { BsPencilSquare, BsStar, BsStarFill } from "react-icons/bs";

const BookLoverReviews = () => {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: "Ayesha Perera",
      date: "April 5, 2025",
      rating: 5,
      comment:
        "Absolutely love the service! Got my books in perfect condition and the little bookmarks made my day 💖",
    },
    {
      name: "Nimal Silva",
      date: "April 6, 2025",
      rating: 4,
      comment:
        "Great experience overall. Delivery was quick and everything was neatly packed. Will order again!",
    },
    {
      name: "Kavindu Jayasuriya",
      date: "April 3, 2025",
      rating: 5,
      comment:
        "So happy with the quality and care taken in packaging. These folks really know how to treat book lovers.",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 0,
  });

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="d-flex justify-content-center mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant="link"
            className="p-0 me-2"
            onClick={() => onRatingChange(star)}
            aria-label={`Rate ${star} stars`}
          >
            {star <= rating ? (
              <BsStarFill
                size={24}
                className="text-warning"
                style={{ transition: "color 0.2s ease" }}
              />
            ) : (
              <BsStar
                size={24}
                className="text-secondary"
                style={{ transition: "color 0.2s ease" }}
              />
            )}
          </Button>
        ))}
      </div>
    );
  };

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({ name: "", email: "", comment: "", rating: 0 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.comment) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (formData.comment.length > 100) {
      alert("Review must be 100 characters or less");
      return;
    }

    const newReview = {
      name: formData.name,
      email: formData.email,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setReviews([...reviews, newReview]);
    handleCloseForm();
  };

  const chunkReviews = (reviews, chunkSize) => {
    const result = [];
    for (let i = 0; i < reviews.length; i += chunkSize) {
      result.push(reviews.slice(i, i + chunkSize));
    }
    return result;
  };

  const reviewChunks = chunkReviews(reviews, 3);

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4"
        style={{ fontWeight: "bold", color: "#ff6f61" }}
      >
        What Our Book Lovers Are Saying 📚✨
      </h2>

      <Carousel
        interval={3000}
        pause="hover"
        controls={false}
        indicators={false}
      >
        {reviewChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row className="g-4 justify-content-center">
              {chunk.map((review, reviewIndex) => (
                <Col key={reviewIndex} md={4}>
                  <div className="bg-white p-4 rounded shadow-sm text-center h-100">
                    <div
                      className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        fontSize: "1.2rem",
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <h5 className="mb-1">{review.name}</h5>
                    <div className="text-warning mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <BsStarFill key={i} />
                      ))}
                    </div>
                    <small className="text-muted d-block mb-2">
                      {review.date}
                    </small>
                    <p className="text-muted">{review.comment}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="text-center mt-4">
        <Button
          variant="primary"
          size="lg"
          className="rounded-pill px-4 py-2"
          style={{
            backgroundColor: "#ff6f61",
            borderColor: "#ff6f61",
            fontWeight: "600",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={handleShowForm}
        >
          <BsPencilSquare className="me-2" />
          Share Your Bookish Thoughts
        </Button>

        <Modal show={showForm} onHide={handleCloseForm} centered>
          <Modal.Header closeButton>
            <Modal.Title>Share Your Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating *</Form.Label>
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) =>
                    setFormData({ ...formData, rating })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Review * (max 100 characters)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  maxLength={100}
                  required
                />
                <div className="text-muted text-end mt-1">
                  {formData.comment.length}/100
                </div>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
                <Button variant="secondary" onClick={handleCloseForm}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default BookLoverReviews;

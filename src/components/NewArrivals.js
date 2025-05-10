import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";

const NewArrivals = ({ showAll = false, onAddToCart = () => {} }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = useMemo(() => (showAll ? 12 : 8), [showAll]);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        newArrivals: "true",
        page: currentPage,
        limit: itemsPerPage,
      });

      // Add search filter
      if (searchQuery) params.append("search", searchQuery);

      // Add price range filters
      switch (priceRange) {
        case "below-3000":
          params.append("maxPrice", 3000);
          break;
        case "3000-3500":
          params.append("minPrice", 3000);
          params.append("maxPrice", 3500);
          break;
        case "above-3500":
          params.append("minPrice", 3500);
          break;
        default:
          break;
      }

      // Add type filters
      switch (filterType) {
        case "bestseller":
          params.append("bestseller", "true");
          break;
        case "top-rated":
          params.append("minRating", 4);
          break;
        default:
          break;
      }

      const response = await fetch(
        `http://localhost:5000/api/books?newarrivals=true&${params.toString()}`
      );

      if (!response.ok) throw new Error("Failed to fetch new arrivals");

      const data = await response.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery, priceRange, filterType]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAddToCart = (book, e) => {
    e.stopPropagation();
    onAddToCart(book);
    alert(`Added ${book.title} to cart!`);
  };

  const handleViewAll = () => navigate("/newarrivals");
  const handleBookClick = (book) =>
    navigate(`/books/${encodeURIComponent(book.title)}`, { state: { book } });

  const renderPagination = () => {
    if (!showAll || totalPages <= 1) return null;

    return (
      <Pagination className="justify-content-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    );
  };

  // Animation configuration
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 300, friction: 20 },
  });

  return (
    <Container className="my-5">
      <div className="position-relative mb-4 text-center">
        <h2>New Arrivals 📚</h2>
        {!showAll && (
          <Button
            variant="outline-primary"
            onClick={handleViewAll}
            className="rounded-pill px-4 py-2 d-none d-lg-block"
            style={{
              fontWeight: "500",
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            View All Books →
          </Button>
        )}
      </div>

      {showAll && (
        <Row className="mb-4 g-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-pill"
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="rounded-pill"
            >
              <option value="all">All Prices</option>
              <option value="below-3000">Below ₹3000</option>
              <option value="3000-3500">₹3000 - ₹3500</option>
              <option value="above-3500">Above ₹3500</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-pill"
            >
              <option value="all">All Books</option>
              <option value="bestseller">Best Sellers</option>
              <option value="top-rated">Top Rated (4+ ⭐)</option>
            </Form.Select>
          </Col>
        </Row>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          Error loading books: {error}
        </Alert>
      ) : books.length === 0 ? (
        <p className="text-center">No books found matching your criteria</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map((book) => (
            <Col key={book._id}>
              <animated.div style={animationProps}>
                <Card
                  className="h-100 shadow-sm border-0"
                  onClick={() => handleBookClick(book)}
                  style={{ cursor: "pointer" }}
                >
                  <div style={{ height: "300px", overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={book.image}
                      alt={book.title}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-5">{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted small">
                      By {book.author}
                    </Card.Subtitle>
                    {book.quantity > 0 && (
                      <div className="text-muted small mb-2">
                        In stock: {book.quantity}
                      </div>
                    )}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-success fw-bold">
                          ₹{book.price.toFixed(2)}
                        </span>
                        {book.rating >= 4 && (
                          <span className="text-warning">
                            ⭐{book.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="primary"
                        onClick={(e) => handleAddToCart(book, e)}
                        className="w-100 mt-3"
                        size="sm"
                        disabled={book.quantity === 0}
                      >
                        {book.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </animated.div>
            </Col>
          ))}
        </Row>
      )}

      {renderPagination()}

      {!showAll && (
        <div className="text-center mt-4 d-lg-none">
          <Button
            variant="primary"
            onClick={handleViewAll}
            size="lg"
            className="px-5 rounded-pill"
          >
            View All Books
          </Button>
        </div>
      )}
    </Container>
  );
};

export default NewArrivals;

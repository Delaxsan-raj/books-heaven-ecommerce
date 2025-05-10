import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Pagination,
  Placeholder,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaBook, FaExclamationCircle, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const FeaturedBooks = ({
  showAll = false,
  searchQuery = "",
  priceRange = "all",
  filterType = "all",
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [addingBookId, setAddingBookId] = useState(null);

  const ITEMS_PER_PAGE = useMemo(() => (showAll ? 12 : 8), [showAll]);
  const STOCK_STATUS = { low: 5, medium: 15 };

  const fetchBooks = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          featured: "true",
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          search: searchQuery,
        };

        // Price range filter
        if (priceRange === "below-3000") {
          params.minPrice = 0;
          params.maxPrice = 3000;
        } else if (priceRange === "3000-3500") {
          params.minPrice = 3000;
          params.maxPrice = 3500;
        } else if (priceRange === "above-3500") {
          params.minPrice = 3500;
        }

        // Category filter
        if (filterType === "fancy") params.category = "fancy";

        const { data } = await axios.get("http://localhost:5000/api/books", {
          params,
          timeout: 10000,
          signal,
          headers: {
            "x-guest-id": localStorage.getItem("guestId"),
            Authorization: localStorage.getItem("token"),
          },
        });

        setBooks(data.books);
        setTotalPages(data.totalPages);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(
            err.response?.data?.message ||
              "Failed to load books. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [currentPage, ITEMS_PER_PAGE, searchQuery, priceRange, filterType]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchBooks(controller.signal);
    return () => controller.abort();
  }, [fetchBooks]);

  const getStockStatus = (quantity) => {
    if (quantity === 0) return "out-of-stock";
    if (quantity <= STOCK_STATUS.low) return "low-stock";
    if (quantity <= STOCK_STATUS.medium) return "medium-stock";
    return "in-stock";
  };

  const handleBookClick = (book) => {
    navigate(`/books/${encodeURIComponent(book.title)}`, {
      state: { book },
      replace: true,
    });
  };

  const handleAddToCart = async (book) => {
    try {
      setAddingBookId(book._id);
      await addToCart(book._id, 1);
      toast.success(`${book.title} added to cart!`);
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      if (message.includes("auth")) {
        toast.error("Please login to add items to cart");
      } else if (message.includes("stock")) {
        toast.error(message);
      } else {
        toast.error("Failed to add item. Please try again.");
      }
    } finally {
      setAddingBookId(null);
    }
  };

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 300, friction: 20 },
  });

  const renderLoadingSkeletons = () => (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
        <Col key={index}>
          <Card className="h-100 shadow-sm border-0">
            <Placeholder as={Card.Img} animation="wave" />
            <Card.Body>
              <Placeholder as={Card.Title} animation="wave">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="wave">
                <Placeholder xs={7} /> <Placeholder xs={4} />
                <Placeholder xs={4} /> <Placeholder xs={6} />
                <Placeholder xs={8} />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderBookCard = (book) => {
    const stockStatus = getStockStatus(book.quantity);
    const isAdding = addingBookId === book._id;
    const isOutOfStock = stockStatus === "out-of-stock";

    return (
      <animated.div style={animationProps} key={book._id}>
        <Card
          className="h-100 shadow-sm border-0 hover-shadow"
          onClick={() => !isAdding && handleBookClick(book)}
          role="button"
          aria-label={`View ${book.title} details`}
          data-testid="book-card"
        >
          <div className="book-image-container">
            <Card.Img
              variant="top"
              src={book.image || "/placeholder-book.jpg"}
              alt={book.title}
              loading="lazy"
              onError={(e) => {
                e.target.src = "/placeholder-book.jpg";
              }}
            />
            <div className={`stock-badge ${stockStatus}`}>
              {stockStatus.replace("-", " ")}
            </div>
          </div>

          <Card.Body className="d-flex flex-column">
            <Card.Title className="fs-5 text-truncate">{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted small">
              By {book.author}
            </Card.Subtitle>

            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="price-tag">
                  <FaRupeeSign className="me-1" />
                  {(book.price || 0).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  })}
                </div>
                {book.best_seller && (
                  <span className="bestseller-badge">
                    <FaBook className="me-1" />
                    Bestseller
                  </span>
                )}
              </div>

              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(book);
                }}
                className="w-100"
                size="sm"
                disabled={isAdding || isOutOfStock}
                aria-label={`Add ${book.title} to cart`}
              >
                {isAdding ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Adding...</span>
                  </>
                ) : isOutOfStock ? (
                  "Out of Stock"
                ) : (
                  "Add to Cart"
                )}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </animated.div>
    );
  };

  return (
    <Container className="my-5 featured-books-container">
      <div className="section-header mb-5">
        <h2 className="display-5 text-center">
          <FaBook className="me-2" />
          {showAll ? "Featured Collection" : "Featured Books"}
        </h2>
        {!showAll && (
          <Button
            variant="outline-primary"
            onClick={() => navigate("/featured-books")}
            className="view-all-button"
          >
            Explore Collection →
          </Button>
        )}
      </div>

      {loading ? (
        renderLoadingSkeletons()
      ) : error ? (
        <Alert variant="danger" className="text-center error-alert">
          <FaExclamationCircle className="me-2" />
          {error}
          <div className="mt-3">
            <Button variant="outline-danger" onClick={() => fetchBooks()}>
              Retry
            </Button>
          </div>
        </Alert>
      ) : books.length === 0 ? (
        <div className="no-results text-center">
          <FaBook className="display-4 text-muted mb-3" />
          <h4>No matching books found</h4>
          <p className="text-muted">Adjust filters or search terms</p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.map(renderBookCard)}
        </Row>
      )}

      {showAll && totalPages > 1 && (
        <Pagination className="justify-content-center mt-5">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default FeaturedBooks;

// src/components/FeaturedBooksPage.js
import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import FeaturedBooks from "./FeaturedBooks";

const FeaturedBooksPage = ({ showAll }) => {
  const [filters, setFilters] = useState({
    searchQuery: "",
    priceRange: "all",
    filterType: "all",
  });
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (book) => {
    try {
      setIsAddingToCart(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.info("🛒 Please login to add items to your cart", {
          position: "top-center",
          autoClose: 4000,
        });
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/cart",
        { bookId: book._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(
        <div>
          <strong>"{book.title}"</strong> added to cart! 🛒
          <br />
          <small>Current total: ₹{data.cartTotal?.toFixed(2)}</small>
        </div>,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add item to cart. Please try again later.";

      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <Container className="my-5 featured-books-page">
      {showAll && (
        <h1 className="text-center mb-5 display-4 text-primary">
          Featured Books Collection
        </h1>
      )}

      {showAll && (
        <div className="bg-light p-4 rounded-3 shadow-sm mb-5">
          <Form>
            <Row className="align-items-center g-3">
              <Col md={4}>
                <Form.Control
                  type="search"
                  placeholder="Search by title or author"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    handleFilterChange("searchQuery", e.target.value)
                  }
                  className="rounded-pill"
                />
              </Col>

              <Col md={4}>
                <Form.Select
                  value={filters.priceRange}
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value)
                  }
                  className="rounded-pill"
                >
                  <option value="all">All Prices</option>
                  <option value="below-3000">Under ₹3000</option>
                  <option value="3000-3500">₹3000 - ₹3500</option>
                  <option value="above-3500">Over ₹3500</option>
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Select
                  value={filters.filterType}
                  onChange={(e) =>
                    handleFilterChange("filterType", e.target.value)
                  }
                  className="rounded-pill"
                >
                  <option value="all">All Categories</option>
                  <option value="fancy">Special Editions</option>
                  <option value="bestseller">Bestsellers</option>
                  <option value="top-rated">Top Rated</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </div>
      )}

      <FeaturedBooks
        {...filters}
        showAll={showAll}
        onAddToCart={handleAddToCart}
        isAddingToCart={isAddingToCart}
      />
    </Container>
  );
};

export default FeaturedBooksPage;

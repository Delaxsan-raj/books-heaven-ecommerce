// src/components/NewArrivalsPage.js (updated)
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import NewArrivals from "./NewArrivals";

const NewArrivalsPage = ({ addToCart, showAll }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [filterType, setFilterType] = useState("all");

  return (
    <Container className="my-5">
      {showAll && (
        <h1 className="text-center mb-5 display-4">All New Arrivals</h1>
      )}

      <NewArrivals
        showAll={showAll}
        searchQuery={searchQuery}
        priceRange={priceRange}
        filterType={filterType}
        onSearchChange={setSearchQuery}
        onPriceRangeChange={setPriceRange}
        onFilterTypeChange={setFilterType}
        onAddToCart={addToCart}
      />
    </Container>
  );
};

export default NewArrivalsPage;

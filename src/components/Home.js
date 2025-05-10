import React from "react";
import FeaturedBooks from "./FeaturedBooks";

const Home = ({ onAddToCart }) => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Featured Books</h2>
      <FeaturedBooks onAddToCart={onAddToCart} />
    </div>
  );
};

export default Home;

import React from "react";
import { Container } from "react-bootstrap";

const BookstoreIntro = () => {
  return (
    <Container className="my-5">
      <div className="bg-light p-5 rounded shadow-sm text-center">
        <h1 className="mb-3 text-primary fw-bold">
          Welcome to Bookheaven.lk 💙
        </h1>
        <p className="fw-semibold fs-5 text-secondary bg-light p-3 rounded">
          Fall in love with reading all over again —
          <strong className="text-dark"> Bookheaven.lk </strong> brings your
          favorite stories right to your doorstep. From bestsellers to hidden
          gems, discover the joy of books curated with care just for you!
        </p>
      </div>
    </Container>
  );
};

export default BookstoreIntro;

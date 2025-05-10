// CartConfirmationModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const CartConfirmationModal = ({ show, onClose, bookTitle }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Item Added to Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{bookTitle} has been successfully added to your cart.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartConfirmationModal;

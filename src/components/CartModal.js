// src/components/CartModal.js
import { useEffect, useState } from "react";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";
import { useCart } from "../context/CartContext";

export default function CartModal({ showCart, setShowCart }) {
  const {
    cart,
    updateQuantity,
    removeItem,
    checkout,
    loading,
    error,
    clearError,
  } = useCart();
  const [processingCheckout, setProcessingCheckout] = useState(false);
  const cartItems = cart?.items || [];

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = async (itemId, delta) => {
    try {
      const item = cartItems.find((i) => i._id === itemId);
      const newQuantity = item.quantity + delta;

      if (newQuantity > 0) {
        await updateQuantity(itemId, newQuantity);
      } else {
        await removeItem(itemId);
      }
    } catch (error) {
      console.error("Quantity update failed:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      setProcessingCheckout(true);
      await checkout();
      setShowCart(false);
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setProcessingCheckout(false);
    }
  };

  useEffect(() => {
    if (!showCart) clearError();
  }, [showCart, clearError]);

  return (
    <Modal show={showCart} onHide={() => setShowCart(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Shopping Cart ({cartItems.length} item{cartItems.length !== 1 && "s"})
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <Alert variant="danger" onClose={clearError} dismissible>
            {error}
          </Alert>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-cart-x fs-1 text-muted"></i>
            <p className="mt-3">Your cart is empty</p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => {
              const book = item.book || {};
              const maxQuantity = book.quantity || 0;
              const currentQuantity = item.quantity || 0;

              return (
                <div
                  key={item._id}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={book.image || "/placeholder-book.jpg"}
                      alt={book.title}
                      width="60"
                      className="rounded border"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/placeholder-book.jpg";
                      }}
                    />
                    <div>
                      <h6 className="mb-1">{book.title || "Unknown Book"}</h6>
                      <div className="d-flex gap-3 align-items-center">
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item._id, -1);
                            }}
                            disabled={loading}
                          >
                            -
                          </Button>
                          <span className="mx-2">{currentQuantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(item._id, 1);
                            }}
                            disabled={loading || currentQuantity >= maxQuantity}
                          >
                            +
                          </Button>
                        </div>
                        <span className="text-muted">
                          Rs. {item.price?.toFixed(2) || "0.00"} each
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">
                      Rs. {(item.price * currentQuantity)?.toFixed(2) || "0.00"}
                    </div>
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item._id);
                      }}
                      disabled={loading}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
            <div className="total-price text-end fw-bold fs-4 border-top pt-3">
              Total: Rs. {calculateTotal().toFixed(2)}
            </div>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowCart(false)}
          disabled={loading || processingCheckout}
        >
          Continue Shopping
        </Button>
        {cartItems.length > 0 && (
          <Button
            variant="primary"
            onClick={handleCheckout}
            disabled={processingCheckout || loading}
          >
            {processingCheckout ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Processing...</span>
              </>
            ) : (
              "Proceed to Checkout"
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

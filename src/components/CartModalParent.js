import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import api from "./api";

function CartModalParent() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart data when modal opens
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/cart");
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (showCart) fetchCart();
  }, [showCart]);

  const handleQuantityChange = async (itemId, delta) => {
    try {
      await api.patch(`/cart/${itemId}`, { quantityDelta: delta });
      const { data } = await api.get("/cart");
      setCartItems(data.items);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      const { data } = await api.get("/cart");
      setCartItems(data.items);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await api.post("/cart/checkout");
      setCartItems([]);
      // Clear guest ID if exists
      if (!localStorage.getItem("token")) {
        localStorage.removeItem("guestId");
      }
      setShowCart(false);
      alert("Checkout successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setShowCart(true)}>
        Cart ({cartItems.length})
      </Button>

      <CartModal
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
        loading={loading}
      />
    </>
  );
}

function CartModal({
  showCart,
  setShowCart,
  cartItems,
  onQuantityChange,
  onRemove,
  onCheckout,
  loading,
}) {
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Modal show={showCart} onHide={() => setShowCart(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Shopping Cart ({cartItems.length} item{cartItems.length !== 1 && "s"})
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {cartItems.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-cart-x fs-1 text-muted"></i>
            <p className="mt-3">Your cart is empty</p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.book?.image || "/placeholder-book.jpg"}
                    alt={item.book?.title}
                    width="60"
                    className="rounded border"
                  />
                  <div>
                    <h6 className="mb-1">{item.book?.title}</h6>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => onQuantityChange(item.book._id, -1)}
                          disabled={loading}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => onQuantityChange(item.book._id, 1)}
                          disabled={loading}
                        >
                          +
                        </Button>
                      </div>
                      <span className="text-muted">
                        Rs. {item.price.toFixed(2)} each
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <div className="fw-bold">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => onRemove(item.book._id)}
                    disabled={loading}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
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
          disabled={loading}
        >
          Continue Shopping
        </Button>
        {cartItems.length > 0 && (
          <Button variant="primary" onClick={onCheckout} disabled={loading}>
            {loading ? (
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

export default CartModalParent;

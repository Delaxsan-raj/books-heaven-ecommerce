import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CheckoutModal = ({
  showCheckout,
  setShowCheckout,
  cartItems,
  setCartItems,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveItem,
  isLoggedIn,
  registeredPhone,
  onConfirm, // Prop to pass the registered phone number
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(registeredPhone || ""); // Automatically fill with registered phone
  const [altPhone, setAltPhone] = useState("");
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (showCheckout) {
      // Reset fields on modal open
      setSelectedPaymentMethod("");
      setName("");
      setAddress("");
      setPhone(registeredPhone || ""); // Reset phone to registered number
      setAltPhone("");
      setReceipt(null);
      setIsProcessing(false);
    }
  }, [showCheckout, registeredPhone]);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Modify the handleConfirmOrder function
  const handleConfirmOrder = () => {
    if (!isLoggedIn) return alert("Please login to continue.");
    if (!selectedPaymentMethod) return alert("Please select a payment method");
    if (!name || !address || !phone) {
      return alert("Please fill in all required fields.");
    }
    if (selectedPaymentMethod === "bank" && !receipt) {
      return alert("Please upload your bank deposit receipt.");
    }

    const orderDetails = {
      items: cartItems,
      total: calculateTotal(),
      shippingDetails: {
        name,
        address,
        phone,
        altPhone,
      },
      receipt: receipt
        ? {
            name: receipt.name,
            size: receipt.size,
            type: receipt.type,
          }
        : null,
    };

    setIsProcessing(true);
    setTimeout(() => {
      onConfirm(selectedPaymentMethod, orderDetails);
      setIsProcessing(false);
    }, 2000);
  };

  const handleImageUpload = (e) => {
    setReceipt(e.target.files[0]);
  };

  return (
    <Modal show={showCheckout} onHide={() => setShowCheckout(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Checkout ({cartItems.length} items)</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Cart Items */}
        {cartItems.map((item) => (
          <div
            key={item.title}
            className="mb-3 border-bottom pb-3 d-flex align-items-center"
          >
            <img
              src={item.image || "https://via.placeholder.com/60x80"}
              alt={item.title}
              style={{
                width: "60px",
                height: "80px",
                objectFit: "cover",
                marginRight: "15px",
              }}
            />
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <h6 className="mb-1">{item.title}</h6>
                <Button
                  variant="link"
                  onClick={() => handleRemoveItem(item.title)}
                  className="text-danger p-0"
                >
                  Remove
                </Button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Button
                    size="sm"
                    onClick={() => handleDecreaseQuantity(item.title)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    size="sm"
                    onClick={() => handleIncreaseQuantity(item.title)}
                  >
                    +
                  </Button>
                </div>
                <div>₹{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="text-end fw-bold fs-4 mt-3">
          Total: ₹{calculateTotal().toFixed(2)}
        </div>

        {/* Payment Method Dropdown */}
        <Form className="mt-4">
          <Form.Group>
            <Form.Label>Payment Method</Form.Label>
            <Form.Select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="">-- Select Payment Method --</option>
              <option value="bank">Bank Deposit</option>
              <option value="cash">Cash on Delivery</option>
              <option value="online" disabled>
                Online Payment (Coming Soon)
              </option>
            </Form.Select>
          </Form.Group>
        </Form>

        {/* Customer Details */}
        {(selectedPaymentMethod === "bank" ||
          selectedPaymentMethod === "cash") && (
          <Form className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Name*</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address*</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number*</Form.Label>
              <Form.Control
                type="text"
                value={registeredPhone || phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone Number"
                disabled={!!registeredPhone}
              />
              {registeredPhone && (
                <Form.Text className="text-muted">
                  Using your registered phone number
                </Form.Text>
              )}
            </Form.Group>

            {/* Optional alt phone for Cash */}
            {selectedPaymentMethod === "cash" && (
              <Form.Group className="mb-3">
                <Form.Label>Another Number (optional)</Form.Label>
                <Form.Control
                  type="text"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                />
              </Form.Group>
            )}

            {/* Receipt Upload for Bank */}
            {selectedPaymentMethod === "bank" && (
              <Form.Group className="mb-3">
                <Form.Label>Upload Bank Deposit Receipt*</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
                {receipt && (
                  <div className="mt-2">Selected: {receipt.name}</div>
                )}
              </Form.Group>
            )}
          </Form>
        )}
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowCheckout(false)}
          disabled={isProcessing}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirmOrder}
          disabled={!isLoggedIn || isProcessing || cartItems.length === 0}
        >
          {isProcessing ? "Processing..." : "Submit Order"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;

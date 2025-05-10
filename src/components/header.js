import { useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header({
  onCartClick,
  isLoggedIn,
  userData,
  onLogin,
  onLogout,
}) {
  const { cartCount, mergeCarts } = useCart();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      name: "",
      emailOrPhone: "",
      password: "",
      confirmPassword: "",
      address: "",
    });
    setError("");
  };

  const openModal = (mode) => {
    resetForm();
    setIsLogin(mode === "login");
    setShowAuthModal(true);
  };

  const closeModal = () => {
    resetForm();
    setShowAuthModal(false);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Handle login
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailOrPhone: formData.emailOrPhone,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");

        // Update user state and merge carts
        onLogin({ token: data.token, user: data.user });
        await mergeCarts(data.user._id); // Merge guest cart with user cart
        closeModal();
        navigate("/profile");
      } else {
        // Handle registration
        const userData = {
          name: formData.name,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          address: formData.address,
        };

        // Validate email/phone format
        if (formData.emailOrPhone.includes("@")) {
          userData.email = formData.emailOrPhone;
        } else {
          userData.phone = formData.emailOrPhone;
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        // Update user state and merge carts
        onLogin({ token: data.token, user: data.user });
        await mergeCarts(data.user._id); // Merge guest cart with user cart
        closeModal();
        navigate("/profile");
      }
    } catch (err) {
      setError(err.message);
      console.error("Authentication error:", err);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm py-3 border-bottom">
        <Container fluid="xxl">
          <Navbar.Brand as={Link} to="/">
            <img
              src="../images/logo-fotor.png"
              alt="Logo"
              style={{ height: "60px", width: "auto", objectFit: "contain" }}
            />
            <span className="ms-3 fs-3 fw-semibold text-primary"></span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar" className="justify-content-between">
            <Form className="d-none d-lg-block mx-auto w-50" role="search">
              <Form.Control
                type="search"
                placeholder="Search for books, authors, categories..."
                className="rounded-pill px-4 shadow-sm border-0"
              />
            </Form>

            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <Button
                variant="outline-secondary"
                className="rounded-circle position-relative p-2"
                style={{ width: "42px", height: "42px" }}
                onClick={onCartClick}
              >
                <i className="bi bi-cart3 fs-5 text-dark"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Button>

              {isLoggedIn ? (
                <NavDropdown
                  title={
                    <div className="d-inline-flex align-items-center gap-2">
                      <i className="bi bi-person-circle fs-4"></i>
                      <span className="fw-medium">
                        {userData?.name || "Profile"}
                      </span>
                    </div>
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person me-2"></i>My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/orders">
                    <i className="bi bi-box-seam me-2"></i>My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="d-flex gap-3">
                  <Button
                    variant="outline-primary"
                    onClick={() => openModal("login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => openModal("register")}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Authentication Modal */}
      <Modal show={showAuthModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold">
            {isLogin ? "Welcome Back!" : "Create Your Account"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAuthSubmit}>
            {!isLogin && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Email or Phone</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter your email or phone number"
                value={formData.emailOrPhone}
                onChange={(e) =>
                  setFormData({ ...formData, emailOrPhone: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>

            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}

            {error && <div className="text-danger mb-3">{error}</div>}

            <Button type="submit" className="w-100" variant="primary">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

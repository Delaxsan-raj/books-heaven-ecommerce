import { Facebook, Instagram, MessageCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="d-flex flex-column">
      <main className="flex-grow-1">
        <div className="text-center">
          {/* Add your main content here if needed */}
        </div>
      </main>
      <footer className="bg-light py-5 border-top">
        <div className="container">
          <div className="row">
            {/* Newsletter - Right Side */}
            <div className="col-md-3 order-md-last mb-4 mb-md-0">
              <h3 className="h4 mb-3 fw-bold">Join our newsletter</h3>
              <p className="text-secondary mb-3 fs-5">
                Get exclusive offers, the best in books and more. You may
                unsubscribe anytime.
              </p>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control fs-5"
                  placeholder="Email"
                />
                <button type="submit" className="btn btn-warning fs-5">
                  SUBSCRIBE
                </button>
              </div>
            </div>

            {/* Company Info - Left Side */}
            <div className="col-md-3 mb-4 mb-md-0">
              <h3 className="h4 mb-3 fw-bold">Booksheaven.lk</h3>
              <p className="text-secondary mb-3 fs-5">
                #1 rated online bookstore in Sri Lanka. We believe books change
                lives.
              </p>
              <div className="d-flex flex-column mb-3">
                <span className="text-warning mb-2 fs-5 fw-semibold">
                  <span className="me-2">📞</span> +94 75 4885 720
                </span>
                <span className="text-warning fs-5 fw-semibold">
                  <span className="me-2">✉️</span> support@booksheaven.lk
                </span>
              </div>
              <div className="d-flex">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2 d-flex align-items-center justify-content-center rounded-circle bg-primary text-white p-2"
                  style={{ width: "45px", height: "45px" }}
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-2 d-flex align-items-center justify-content-center rounded-circle text-white p-2"
                  style={{
                    width: "45px",
                    height: "45px",
                    background:
                      "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)",
                  }}
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://wa.me/94754885720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white p-2"
                  style={{ width: "45px", height: "45px" }}
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>

            {/* About */}
            <div className="col-md-3 mb-4 mb-md-0">
              <h3 className="h4 mb-3 fw-bold">About</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link
                    to="/about-us"
                    className="text-secondary fs-5 text-decoration-none"
                  >
                    <span className="me-2">•</span> About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/contact-us"
                    className="text-secondary fs-5 text-decoration-none"
                  >
                    <span className="me-2">•</span> Contact Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/privacy-policy"
                    className="text-secondary fs-5 text-decoration-none"
                  >
                    <span className="me-2">•</span> Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/terms-and-conditions"
                    className="text-secondary fs-5 text-decoration-none"
                  >
                    <span className="me-2">•</span> Terms & Conditions
                  </Link>
                </li>
                <li>
                  <span className="text-secondary fs-5">
                    <span className="me-2">•</span> Returns
                  </span>
                </li>
              </ul>
            </div>

            {/* Shopping */}
            <div className="col-md-3 mb-4 mb-md-0">
              <h3 className="h4 mb-3 fw-bold">Shopping</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="text-secondary fs-5">
                    <span className="me-2">•</span> Gift Vouchers
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-secondary fs-5">
                    <span className="me-2">•</span> Loyalty Points
                  </span>
                </li>
                <li>
                  <span className="text-secondary fs-5">
                    <span className="me-2">•</span> Accessories
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

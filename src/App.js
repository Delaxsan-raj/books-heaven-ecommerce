import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Components
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./components/AboutUs";
import BookDetail from "./components/BookDetails";
import BookLoverReviews from "./components/BookLoverReviews";
import Books from "./components/Books";
import BookstoreIntro from "./components/BookStoreIntro";
import CartModal from "./components/CartModal";
import CategorySlider from "./components/CategorySlider";
import CheckoutModal from "./components/CheckoutModal";
import ContactUs from "./components/ContactUs";
import Copyright from "./components/Copyright";
import FeaturedBooks from "./components/FeaturedBooks";
import FeaturedBooksPage from "./components/FeaturedBooksPage";
import Footer from "./components/Footer";
import Header from "./components/header";
import NewArrivals from "./components/NewArrivals";
import NewArrivalsBooksPage from "./components/NewArrivalsBooksPage";
import Orders from "./components/Orders";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Profile from "./components/Profile";
import ServiceFeatures from "./components/ServiceFeatures";
import MainSlider from "./components/Slider";
import { CartProvider } from "./context/CartContext";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orders, setOrders] = useState([]);

  // Auth state initialization from localStorage
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userData: null,
  });

  // Initialize auth state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (token && userData) {
      setAuthState({
        isLoggedIn: true,
        userData,
      });
    }
  }, []);

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.title === book.title);
      return existingItem
        ? prevItems.map((item) =>
            item.title === book.title
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (itemTitle) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== itemTitle)
    );
  };

  const handleQuantityChange = (itemTitle, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.title === itemTitle
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = (paymentMethod, orderDetails) => {
    setShowCheckout(false);
    setTimeout(() => {
      setCartItems([]);
      setOrders((prevOrders) => [
        ...prevOrders,
        {
          ...orderDetails,
          orderId: Date.now(),
          date: new Date().toLocaleString(),
          paymentMethod,
          status: "Processing",
        },
      ]);
      alert(`Order successful via ${paymentMethod}!`);
    }, 200);
  };

  const handleLogin = (authData) => {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    setAuthState({
      isLoggedIn: true,
      userData: authData.user,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({
      isLoggedIn: false,
      userData: null,
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header
            cartCount={cartCount}
            onCartClick={() => setShowCart(true)}
            isLoggedIn={authState.isLoggedIn}
            userData={authState.userData}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />

          <CartModal
            showCart={showCart}
            setShowCart={setShowCart}
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemove={removeFromCart}
            onCheckout={() => {
              setShowCart(false);
              setShowCheckout(true);
            }}
          />

          <CheckoutModal
            showCheckout={showCheckout}
            setShowCheckout={setShowCheckout}
            cartItems={cartItems}
            onConfirm={handleCheckout}
            isLoggedIn={authState.isLoggedIn}
            registeredPhone={authState.userData?.phone}
            setCartItems={setCartItems}
            handleIncreaseQuantity={handleQuantityChange}
            handleDecreaseQuantity={(title) => handleQuantityChange(title, -1)}
            handleRemoveItem={removeFromCart}
          />

          <Routes>
            <Route
              path="/"
              element={
                <div className="home-content">
                  <MainSlider />
                  <BookstoreIntro />
                  <FeaturedBooks onAddToCart={addToCart} />
                  <NewArrivals onAddToCart={addToCart} />
                  <CategorySlider />
                  <ServiceFeatures />
                  <BookLoverReviews />
                </div>
              }
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/books/:title"
              element={<BookDetail onAddToCart={addToCart} />}
            />
            <Route
              path="/featured-books"
              element={<FeaturedBooksPage addToCart={addToCart} showAll />}
            />
            <Route
              path="/newarrivals"
              element={<NewArrivalsBooksPage addToCart={addToCart} showAll />}
            />
            <Route
              path="/profile"
              element={<Profile userData={authState.userData} />}
            />
            <Route path="/orders" element={<Orders orders={orders} />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>

          <Footer />
          <Copyright />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </CartProvider>
  );
}

// context/CartContext.js
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo
} from "react";
import { v4 as uuidv4 } from "uuid";
import { cartAPI } from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate proper UUID-based guest ID
  const generateGuestId = useCallback(() => {
    const guestId = `guest-${uuidv4()}`;
    localStorage.setItem("guestId", guestId);
    return guestId;
  }, []);

  const refreshCart = useCallback(
    async (abortController) => {
      setLoading(true);
      try {
        let guestId = localStorage.getItem("guestId");
        const token = localStorage.getItem("token");

        // Generate new guest ID if needed
        if (!token && !guestId) {
          guestId = generateGuestId();
        }

        const cartData = await cartAPI.getCart(abortController?.signal);

        if (cartData) {
          setCart(cartData);
          setCartCount(
            cartData.items.reduce((sum, item) => sum + item.quantity, 0)
          );

          // Sync guest ID with server-generated value
          if (!token && cartData.guestId && cartData.guestId !== guestId) {
            localStorage.setItem("guestId", cartData.guestId);
          }
        }
        setError(null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Cart refresh error:", error.message);
          setError(error.message);

          // Handle invalid session cases
          if (
            error.message.includes("Unauthorized") ||
            error.message.includes("Invalid cart access")
          ) {
            localStorage.removeItem("guestId");
            await refreshCart(abortController);
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [generateGuestId]
  );

  // Auto-refresh cart when authentication state changes
  useEffect(() => {
    const abortController = new AbortController();
    refreshCart(abortController);
    return () => abortController.abort();
  }, [refreshCart]);

  const addToCart = useCallback(
    async (bookId, quantity) => {
      try {
        const newGuestId = await cartAPI.addItem(bookId, quantity);
        if (newGuestId) {
          localStorage.setItem("guestId", newGuestId);
        }
        await refreshCart();
        return true;
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },
    [refreshCart]
  );

  const updateQuantity = useCallback(
    async (itemId, newQuantity) => {
      try {
        await cartAPI.updateItem(itemId, newQuantity);
        await refreshCart();
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },
    [refreshCart]
  );

  const removeItem = useCallback(
    async (itemId) => {
      try {
        await cartAPI.removeItem(itemId);
        await refreshCart();
      } catch (error) {
        setError(error.message);
        throw error;
      }
    },
    [refreshCart]
  );

  const mergeCarts = useCallback(async () => {
    try {
      await cartAPI.mergeCarts();
      localStorage.removeItem("guestId");
      await refreshCart();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, [refreshCart]);

  const checkout = useCallback(async () => {
    try {
      await cartAPI.checkout();
      setCart(null);
      setCartCount(0);
      return true;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(() => ({
    cart,
    cartCount,
    loading,
    error,
    refreshCart,
    addToCart,
    updateQuantity,
    removeItem,
    mergeCarts,
    checkout,
    clearError
  }), [
    cart,
    cartCount,
    loading,
    error,
    refreshCart,
    addToCart,
    updateQuantity,
    removeItem,
    mergeCarts,
    checkout,
    clearError
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Guest ID management
const getGuestId = () => {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
};

// Request interceptor for authentication headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // For authenticated requests
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // For guest requests
  else {
    config.headers["X-Guest-ID"] = getGuestId();
  }

  return config;
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Unknown error occurred";
    return Promise.reject(new Error(errorMessage));
  }
);

// API endpoints
export const booksAPI = {
  fetchBooks: async (params) => {
    try {
      return await api.get("/books", { params });
    } catch (error) {
      throw error;
    }
  },
};

export const cartAPI = {
  getCart: async () => {
    try {
      return await api.get("/cart");
    } catch (error) {
      throw error;
    }
  },

  addItem: async (bookId, quantity) => {
    try {
      return await api.post("/cart/items", { bookId, quantity });
    } catch (error) {
      throw error;
    }
  },

  updateItem: async (itemId, quantityDelta) => {
    try {
      return await api.patch(`/cart/items/${itemId}`, { quantityDelta });
    } catch (error) {
      throw error;
    }
  },

  removeItem: async (itemId) => {
    try {
      return await api.delete(`/cart/items/${itemId}`);
    } catch (error) {
      throw error;
    }
  },

  mergeCarts: async () => {
    try {
      const response = await api.post("/cart/merge", { guestId: getGuestId() });
      localStorage.removeItem("guestId");
      return response;
    } catch (error) {
      throw error;
    }
  },

  checkout: async () => {
    try {
      return await api.post("/cart/checkout");
    } catch (error) {
      throw error;
    }
  },
};

export const authAPI = {
  login: async (credentials) => {
    try {
      return await api.post("/auth/login", credentials);
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      return await api.post("/auth/register", userData);
    } catch (error) {
      throw error;
    }
  },
};

// Utility function to clear auth data
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

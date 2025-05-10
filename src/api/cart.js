import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

const getHeaders = () => ({
  headers: {
    "X-Guest-Id": localStorage.getItem("guestId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

export const cartAPI = {
  getCart: async () => {
    try {
      const response = await axios.get(API_URL, getHeaders());
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to load cart";
      throw new Error(message);
    }
  },

  addItem: async (bookId, quantity) => {
    try {
      const response = await axios.post(
        `${API_URL}/items`,
        { bookId, quantity },
        getHeaders()
      );
      return response.data.guestId;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to add item. Please try again.";
      throw new Error(message);
    }
  },

  updateItem: async (itemId, quantity) => {
    try {
      await axios.patch(
        `${API_URL}/items/${itemId}`,
        { quantity },
        getHeaders()
      );
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update quantity";
      throw new Error(message);
    }
  },

  removeItem: async (itemId) => {
    try {
      await axios.delete(`${API_URL}/items/${itemId}`, getHeaders());
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to remove item";
      throw new Error(message);
    }
  },

  mergeCarts: async () => {
    try {
      await axios.post(`${API_URL}/merge`, {}, getHeaders());
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to merge carts";
      throw new Error(message);
    }
  },

  checkout: async () => {
    try {
      await axios.post(`${API_URL}/checkout`, {}, getHeaders());
      return true;
    } catch (error) {
      const message = error.response?.data?.message || "Checkout failed";
      throw new Error(message);
    }
  },
};

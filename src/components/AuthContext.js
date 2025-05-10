import React from "react";
import api from "./api";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const mergeCarts = async () => {
    try {
      const guestId = localStorage.getItem("guestId");
      if (guestId) {
        await api.post("/cart/merge", { guestId });
        localStorage.removeItem("guestId");
      }
    } catch (err) {
      console.error("Cart merge error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ mergeCarts }}>
      {children}
    </AuthContext.Provider>
  );
};

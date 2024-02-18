import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // Import the CartProvider
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* Nest CartProvider inside AuthProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

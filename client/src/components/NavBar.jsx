import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useCart } from "../context/CartContext";

const NavBar = () => {
  const { cartItems } = useCart();
  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthAction = (action) => {
    if (action === "signUp") {
      navigate("/signup", { state: { from: location.pathname } });
    } else if (action === "signIn") {
      navigate("/login", { state: { from: location.pathname } });
    } else if (action === "signOut") {
      signOut(auth)
        .then(() => navigate("/"))
        .catch((error) => console.error("Logout Error:", error));
    }
  };

  return (
    <nav className="bg-white px-6 py-4 shadow-md border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-purple-600 hover:text-purple-800 transition duration-300"
        >
          Rocket Games
        </Link>
        <div className="flex items-center space-x-4">
          {currentUser && (
            <>
              <Link
                to="/add-funds"
                className="text-gray-800 hover:text-purple-600 transition duration-300"
              >
                Add Funds
              </Link>
              <Link
                to="/user-profile"
                className="text-gray-800 hover:text-purple-600 transition duration-300"
                >
                Orders
              </Link>
            </>
          )}
          <Link
            to="/cart"
            className="text-gray-800 hover:text-purple-600 transition duration-300 relative"
          >
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 inline-block min-w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full text-center leading-6">
                {cartItemCount}
              </span>
            )}
          </Link>
          {currentUser ? (
            <>
              <button
                onClick={() => handleAuthAction("signOut")}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleAuthAction("signIn")}
                className="text-purple-600 hover:bg-gray-100 py-2 px-4 rounded transition duration-300"
              >
                Log In
              </button>
              <button
                onClick={() => handleAuthAction("signUp")}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

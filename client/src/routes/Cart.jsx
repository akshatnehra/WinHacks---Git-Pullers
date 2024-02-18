import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import CartContext from "../context/CartContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center">
        <img
          className="h-16 w-16 object-cover rounded mr-4"
          src={item.imageUrl}
          alt={item.title}
        />
        <div>
          <h5 className="text-lg font-semibold">{item.title}</h5>
          <p className="text-gray-600">
            ${parseFloat(item.price).toFixed(2)} each
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-600 mr-2">
          Total: ${itemTotal}
        </span>
        <button
          onClick={() =>
            updateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l"
        >
          -
        </button>
        <span className="px-4">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-4 text-red-500 hover:text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const [userWalletBalance, setUserWalletBalance] = useState(100.0);

  const totalCartAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const isBalanceSufficient = userWalletBalance >= totalCartAmount;

  const { currentUser } = useAuth();
  let navigate = useNavigate();
  const handleCheckout = () => {
    if (!currentUser) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    if (!isBalanceSufficient) {
      alert(
        "There is not enough balance in your wallet to complete this purchase."
      );
    } else {
      alert("Purchase successful!");
      // Clear cart and perform other actions as needed
      // setUserWalletBalance((prevBalance) => prevBalance - totalCartAmount);
      // setCartItems([]);
    }
  };

  useEffect(() => {
    const fetchUserWalletBalance = async () => {
      const data = {
        email: currentUser.email,
      };

      // Options for the fetch request
      const requestOptions = {
        method: "POST", // Specify the request method
        headers: { "Content-Type": "application/json" }, // Headers to specify the type of content being sent
        body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
      };

      const url = import.meta.env.VITE_REACT_APP_BASE_URL + "/users/balance";
      // Fetch user wallet balance from the server
      fetch(url, requestOptions)
        .then((response) => response.json()) // Convert the response data to JSON
        .then((data) => setUserWalletBalance(data.balance)) // Handle the JSON data/response
        .catch((error) => console.error("Error:", error)); // Catch and log any errors
    };
    if (currentUser) {
      fetchUserWalletBalance();
    }
  }, [userWalletBalance, cartItems]);

  return (
    <>
      <NavBar
        cartItemCount={cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )}
      />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-8">Your Cart</h2>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center text-lg font-medium">
            <span>Total Cart Amount:</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>
          {currentUser && (
            <div className="flex justify-between items-center text-lg font-medium mt-2">
              <span>Wallet Balance:</span>
              <span>${userWalletBalance.toFixed(2)}</span>
            </div>
          )}
          {!isBalanceSufficient && currentUser && (
            <p className="text-red-500 text-sm mt-2">
              Warning: You do not have enough funds in your wallet.
            </p>
          )}
          <button
            onClick={handleCheckout}
            className={`w-full mt-4 text-white font-bold py-2 px-4 rounded ${
              isBalanceSufficient && currentUser
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 cursor-not-allowed"
            }`}
            disabled={!isBalanceSufficient || !currentUser}
          >
            {currentUser ? "Purchase" : "Log In to Purchase"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

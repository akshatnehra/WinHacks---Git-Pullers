import React, { useState } from "react";
import NavBar from "../components/NavBar"; // Ensure correct import path

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
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
          <p className="text-gray-600">${item.price.toFixed(2)} each</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() =>
            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l"
        >
          -
        </button>
        <span className="px-4">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-4 text-red-500 hover:text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Epic Adventure Game",
      price: 49.99,
      quantity: 1,
      imageUrl: "https://source.unsplash.com/random/200x200?sig=1",
    },
    {
      id: 2,
      title: "Space Explorer",
      price: 59.99,
      quantity: 2,
      imageUrl: "https://source.unsplash.com/random/200x200?sig=2",
    },
  ]);

  // Example user wallet balance
  const userWalletBalance = 200.0;

  // Calculate total cart amount and remaining balance
  const totalCartAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const remainingBalance = userWalletBalance - totalCartAmount;

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (remainingBalance < 0) {
      alert(
        "Your wallet balance is insufficient for this purchase. Please remove some items or add funds."
      );
    } else {
      alert("Checkout successful!");
      // Here, implement the checkout logic, such as clearing the cart and updating the wallet balance
      // For this example, we'll just clear the cart
      setCartItems([]);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-8">Your Cart</h2>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center text-lg font-medium">
            <span>Total Cart Amount:</span>
            <span>${totalCartAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-medium mt-4">
            <span>Remaining Wallet Balance:</span>
            <span>${remainingBalance.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className={`w-full mt-6 text-white font-bold py-2 px-4 rounded ${
              remainingBalance >= 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {remainingBalance >= 0 ? "Checkout" : "Insufficient Balance"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;

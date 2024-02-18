import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userBalance, setUserBalance] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);

  const email = currentUser.email;
  // Simulated user data - replace with actual data fetching logic
  const [userData, setUserData] = useState({
    orders: [
      {
        id: 1,
        date: "2023-02-01",
        items: [
          { name: "Game A", quantity: 2, price: 24.99 },
          { name: "Game B", quantity: 1, price: 89.99 },
        ],
        total: 49.98,
      },
      {
        id: 2,
        date: "2023-02-15",
        items: [{ name: "Game B", quantity: 1, price: 89.99 }],
        total: 89.99,
      },
    ],
  });

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
        .then((data) => setUserBalance(data.balance)) // Handle the JSON data/response
        .catch((error) => console.error("Error:", error)); // Catch and log any errors
    };

    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/payments/get-user-payments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: currentUser.email }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Order History:", data);
        if (Array.isArray(data)) {
          setOrderHistory(data); // Update only if data is an array
        } else {
          console.error("Fetched order history is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    if (currentUser) {
      fetchUserWalletBalance();
      fetchOrderHistory();
    }
  }, [currentUser, userBalance]);

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Account Details</h3>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Wallet Balance:</strong> ${userBalance.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
  <h3 className="text-xl font-semibold mb-4">Order History</h3>
  {orderHistory.map((order, index) => (
    <div key={order._id} className="mb-8"> 
      <h4 className="font-semibold text-lg mb-2">
        Order ID: {order._id} - Date: {new Date(order.paymentDate).toLocaleDateString()}
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-2">Item</th>
              <th className="border-b-2 p-2">Quantity</th>
              <th className="border-b-2 p-2">Price</th>
              <th className="border-b-2 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, itemIndex) => (
              <tr key={itemIndex} className="hover:bg-gray-100"> 
                <td className="p-2">{item.name}</td> 
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-right font-semibold p-2">
                Order Total:
              </td>
              <td className="p-2">${order.amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  );
};

export default UserProfile;

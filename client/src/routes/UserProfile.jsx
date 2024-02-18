import React, { useState } from "react";
import NavBar from "../components/NavBar"; // Adjust import path as needed

const UserProfile = () => {
  // Simulated user data - replace with actual data fetching logic
  const [userData, setUserData] = useState({
    email: "user@example.com",
    walletBalance: 150.0,
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

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Account Details</h3>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Wallet Balance:</strong> $
            {userData.walletBalance.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Order History</h3>
          {userData.orders.map((order, index) => (
            <div key={index} className="mb-4">
              <h4 className="font-semibold text-lg mb-2">
                Order ID: {order.id} - Date: {order.date}
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
                        <td className="p-2">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" className="text-right font-semibold p-2">
                        Order Total:
                      </td>
                      <td className="p-2">${order.total.toFixed(2)}</td>
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

import React, { useState } from 'react';
import NavBar from '../components/NavBar'; 

const AddFunds = ({ onAddFunds }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const fundsToAdd = parseFloat(amount);
    if (!isNaN(fundsToAdd) && fundsToAdd > 0) {
      onAddFunds(fundsToAdd);
      alert(`$${fundsToAdd.toFixed(2)} added to your wallet successfully!`);
      setAmount(''); // Reset the input field after adding funds
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Add Funds to Wallet</h2>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount ($):</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter amount"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Add Funds
          </button>
        </form>
      </div>
    </>
  );
};

export default AddFunds;

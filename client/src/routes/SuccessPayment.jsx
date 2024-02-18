import React from 'react';
import NavBar from '../components/NavBar'; // Adjust the path as necessary

const SuccessPayment = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-green-600">Payment Successful!</h1>
        <p>Your payment has been processed successfully.</p>
      </div>
    </>
  );
};

export default SuccessPayment;

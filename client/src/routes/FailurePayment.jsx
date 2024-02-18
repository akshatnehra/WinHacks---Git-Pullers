import React from 'react';
import NavBar from '../components/NavBar'; // Adjust the path as necessary

const FailurePayment = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-red-600">Payment Cancelled or Failed</h1>
        <p>Your payment could not be processed at this time. Please try again later or contact support if the problem persists.</p>
      </div>
    </>
  );
};

export default FailurePayment;

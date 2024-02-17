import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase"; 

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your inbox for further instructions.");
    } catch (error) {
      setError("Failed to reset password. Please try again.");
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Password Reset
        </h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {message && <div className="mb-4 text-green-600">{message}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

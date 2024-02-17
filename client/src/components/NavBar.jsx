import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const NavBar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = (e) => {
    // Prevent the default link behavior
    e.preventDefault();
    navigate("/signup", { state: { from: location.pathname } });
  };

  const handleSignIn = (e) => {
    // Prevent the default link behavior
    e.preventDefault();
    navigate("/login", { state: { from: location.pathname } });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="bg-white px-4 py-3 shadow-sm">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl text-gray-900">Rocket Games</span>
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link
            to="/features"
            className="text-gray-800 hover:text-purple-700 transition ease-in-out duration-300"
          >
            Features
          </Link>
          <Link
            to="/customers"
            className="text-gray-800 hover:text-purple-700 transition ease-in-out duration-300"
          >
            Customers
          </Link>
          <Link
            to="/pricing"
            className="text-gray-800 hover:text-purple-700 transition ease-in-out duration-300"
          >
            Pricing
          </Link>
          <Link
            to="/company"
            className="text-gray-800 hover:text-purple-700 transition ease-in-out duration-300"
          >
            Company
          </Link>
        </div>
        {currentUser ? (
          <button onClick={handleLogout} className="inline-block px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gradient-to-br focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Logout</button>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" state={{ from: location.pathname }} className="text-gray-800 hover:text-purple-700 transition ease-in-out duration-300">Login</Link>
            <button onClick={handleSignUp} className="inline-block px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gradient-to-br focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

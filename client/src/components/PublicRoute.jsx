import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser) {
    // Redirect to the homepage or user dashboard if logged in
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;

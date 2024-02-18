import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import NavBar from "./components/NavBar";
import Home from "./routes/Home";
import Cart from "./routes/Cart";
import ForgetPassword from "./routes/ForgetPassword";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import UserProfile from "./routes/UserProfile";
import Success from "./routes/Success";
import Cancel from "./routes/Cancel";
 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
};

export default App;

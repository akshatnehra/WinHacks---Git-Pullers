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
import GameDetails from "./routes/GameDetails";
import AddFunds from "./routes/AddFunds";
import SuccessPayment from "./routes/SuccessPayment";
import FailurePayment from "./routes/FailurePayment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="/game/:gameId" element={<GameDetails />} />

        <Route path="/success-payment" element={
          <ProtectedRoute>
            <SuccessPayment />
          </ProtectedRoute>
        } />

        <Route path="/failure-payment" element={
          <ProtectedRoute>
            <FailurePayment />
          </ProtectedRoute>
        } />
        
        <Route path="/add-funds" element={
          <ProtectedRoute>
            <AddFunds />
          </ProtectedRoute>
        } />
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
      </Routes>
    </Router>
  );
};

export default App;

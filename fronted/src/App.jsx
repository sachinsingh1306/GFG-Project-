import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import View from "./components/View";
import Checkout from "./components/Checkout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        {/* <Route
          path="/checkout"
          element={
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          }
        /> */}

        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<View />} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  );
};

export default App;

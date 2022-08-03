import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChangePassword from "../pages/ChangePassword";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";

const Router = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

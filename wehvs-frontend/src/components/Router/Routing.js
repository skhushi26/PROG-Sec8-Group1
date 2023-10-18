import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRegister from "../UserRegister";
import EmployerRegister from "../EmployerRegister";
import Login from "../Login";
import Navbar from "../Navigation";
import NotFound from "../NotFound";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";
import UserProfile from "../UserProfile";
import EmployerProfile from "../EmployerProfile";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/employer/register" element={<EmployerRegister />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* <Route path="/" element={<FooterMenu />} /> */}
      </Routes>
    </>
  );
}

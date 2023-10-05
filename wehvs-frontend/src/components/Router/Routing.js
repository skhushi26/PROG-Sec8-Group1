import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRegister from "../UserRegister";
import EmployerRegister from "../EmployerRegister";
import UserLogin from "../UserLogin";
import Navbar from "../Navigation";
import FooterMenu from "../Footer";
import NotFound from "../NotFound";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/employerregister" element={<EmployerRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* <Route path="/" element={<FooterMenu />} /> */}
      </Routes>
    </>
  );
}

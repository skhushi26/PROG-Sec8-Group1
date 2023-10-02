import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRegister from "../UserRegister";
import EmployerRegister from "../EmployerRegister";
import UserLogin from "../UserLogin";
import Navbar from "../Navigation";
import FooterMenu from "../Footer";
import NotFound from "../NotFound";
import UserProfile from "../UserProfile";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/user/register" element={<UserRegister/>} />
          <Route path="/employer/register" element={<EmployerRegister/>} />
          <Route path="/user/profile" element={<UserProfile/>} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* <Route path="/" element={<FooterMenu />} /> */}
      </Routes>
    </>
  );
}

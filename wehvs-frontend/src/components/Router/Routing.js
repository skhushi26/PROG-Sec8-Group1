import React from "react";
import { Routes, Route } from "react-router-dom";
import UserCreate from "../UserCreate";
import UserLogin from "../UserLogin";
import Navbar from "../Navigation";
import FooterMenu from "../Footer";
import NotFound from "../NotFound";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route path="/user/create" element={<UserCreate/>} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* <Route path="/" element={<FooterMenu />} /> */}
      </Routes>
    </>
  );
}

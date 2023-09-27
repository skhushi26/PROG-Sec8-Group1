import React from "react";
import { Routes, Route } from "react-router-dom";
import UserCreate from "../UserCreate";
import UserLogin from "../UserLogin";
import Navbar from "../Navigation";
import NotFound from "../NotFound";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/employee/create" element={<UserCreate />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

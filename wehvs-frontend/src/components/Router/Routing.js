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
import UserRequestList from "../UserRequestList";
import UserCertificateRequest from "../UserCertificateRequest";
import Dashboard from "../Dashboard";
import EmailApproval from "../EmailApproval";
import Membership from "../Membership";
import ReturnPayment from "../ReturnPayment";
import SuccessPayment from "../SuccessPayment";
import JobPostingList from "../JobPostingList";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/employer/register" element={<EmployerRegister />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/user-request" element={<UserRequestList />} />
          <Route path="/user/apply-certificate" element={<UserCertificateRequest />} />
          <Route path="/verify/:token" element={<EmailApproval />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/return" element={<ReturnPayment />} />
          <Route path="/success-payment" element={<SuccessPayment />} />
          <Route path="/job-list" element={<JobPostingList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* <Route path="/" element={<FooterMenu />} /> */}
      </Routes>
    </>
  );
}

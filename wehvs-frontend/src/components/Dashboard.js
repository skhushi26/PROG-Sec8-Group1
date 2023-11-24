import React, { useState } from "react";
import withRouter from "./Router/withRouter";
import FooterMenu from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Dashboard = () => {

  return (
    <div>
     <h1>Dashboard</h1>
     {/* FOOTER */}
     <FooterMenu />
    </div>
  );
}

export default withRouter(Dashboard);

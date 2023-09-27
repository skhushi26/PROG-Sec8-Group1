import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
       {/* HEADER */}
       <div className="header-area header-transparrent">
           <div className="headder-top header-sticky">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-2">
                            <div className="logo">
                                <a href="index.html"><img src="/images/logo/wehvs-logo-1.jpeg" width="220px" alt="WEHVS Home Logo"/></a>
                            </div>  
                        </div>
                        <div className="col-lg-9 col-md-9">
                            <div className="menu-wrapper">
                                <div className="main-menu">
                                    <nav className="d-none d-lg-block">
                                        <ul id="navigation">
                                            <li><a href="index.html">Dashboard</a></li>
                                            <li><a href="job_listing.html">Find a Job </a></li>
                                            <li><a href="about.html">About</a></li>
                                            <li><a href="contact.html">Contact</a></li>
                                          
                                            {/* <li><a href="" className="button button-contactForm boxed-btn btn-login mr-3 pr-3 pr-3">Register</a>
                                                <ul className="submenu">
                                                    <li><a href="/userregister">Register as User</a></li>
                                                    <li><a href="/employerregister">Register as Employer</a></li>
                                                </ul>
                                            </li> */}
                                            
                                        </ul>
                                    </nav>
                                </div>          
                                <div className="header-btn d-none f-right d-lg-block">
                                            {/* <li><a href="" className="button button-contactForm boxed-btn btn-login mr-3 dropbtn">Register</a>
                                                <ul className="dropdown-content">
                                                    <li><a href="/userregister">Register as User</a></li>
                                                    <li><a href="/employerregister">Register as Employer</a></li>
                                                </ul>
                                            </li> */}


                                <div className="dropdown">
                                  <button className="dropbtn mr-3">REGISTER</button>
                                  <div className="dropdown-content">
                                    <a href="/userregister">Register as User</a>
                                    <a href="/employerregister">Register as Employer</a>
                                  </div>
                                </div>


                                            {/* <div className="dropdown">
                                              <button className="dropbtn">Register</button>
                                              <div className="dropdown-content">
                                                <a href="/userregister">Register as User</a>
                                                <a href="/employerregister">Register as Employer</a>
                                              </div>
                                            </div>
 */}

{/* 
                                        <li><a href="#">Register</a>
                                                <ul className="submenu">
                                                    <li><a href="/userregister">Register as User</a></li>
                                                    <li><a href="/employerregister">Register as Employer</a></li>
                                                </ul>
                                            </li> */}

                                    {/* <a href="/userregister" className="button button-contactForm boxed-btn btn-login mr-3">Register</a> */}
                                    <a href="/login" className="button button-contactForm boxed-btn btn-login">Login</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
           </div>
       </div>

       {/* Render child routes */}
       <Outlet />
    </>
  );
};

export default Navbar;

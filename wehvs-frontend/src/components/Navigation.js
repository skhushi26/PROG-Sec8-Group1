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
                                <a href="index.html"><img src="/images/logo/wehvs-logo-1.jpeg" width="220px" alt=""/></a>
                            </div>  
                        </div>
                        <div className="col-lg-9 col-md-9">
                            <div className="menu-wrapper">
                                <div className="main-menu">
                                    <nav className="d-none d-lg-block">
                                        <ul id="navigation">
                                            <li><a href="index.html">Home</a></li>
                                            <li><a href="job_listing.html">Find a Jobs </a></li>
                                            <li><a href="about.html">About</a></li>
                                            <li><a href="#">Page</a>
                                                <ul className="submenu">
                                                    <li><a href="blog.html">Blog</a></li>
                                                    <li><a href="single-blog.html">Blog Details</a></li>
                                                    <li><a href="elements.html">Elements</a></li>
                                                    <li><a href="job_details.html">job Details</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </nav>
                                </div>          
                                <div className="header-btn d-none f-right d-lg-block">
                                    <a href="/register" className="button button-contactForm boxed-btn btn-login mr-3">Register</a>
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

import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            {/* HEADER */}
            <div className="header-area header-transparrent">
                <div className="headder-top header-sticky">
                    {/* <div className="container"> */}
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-2">
                                <div className="logo">
                                    <a href="index.html"><img src="/images/logo/wehvs-logo-1.jpeg" width="220px" alt="WEHVS Home Logo" /></a>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8">
                                <div className="menu-wrapper">
                                    <div className="main-menu">
                                        <nav className="d-none d-lg-block">
                                            <ul id="navigation">
                                                <li><a href="index.html">Dashboard</a></li>
                                                <li><a href="job_listing.html">Find a Job </a></li>
                                                <li><a href="about.html">About</a></li>
                                                <li><a href="contact.html">Contact</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="header-btn d-none f-right d-lg-block">
                                        {/* <div className="dropdown">
                                            <button className="dropbtn mr-3">REGISTER</button>
                                            <div className="dropdown-content">
                                                <a href="/user/register">Register as User</a>
                                                <a href="/employer/register">Register as Employer</a>
                                            </div>
                                        </div> */}

                                        <a href="/login" className="button button-contactForm boxed-btn btn-login mr-3">Login</a>
                                        <a href="/user/profile" className="button button-contactForm boxed-btn btn-login"><span><i className="ti-user profile-icon"></i></span>Profile</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mobile_menu d-block d-lg-none"></div>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
            {/* Render child routes */}
            <Outlet />
        </>
    );
};

export default Navbar;

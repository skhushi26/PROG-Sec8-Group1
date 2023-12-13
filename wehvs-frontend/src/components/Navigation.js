import React, { useEffect, useState } from "react";
import {
    Link,
    Outlet,
    useNavigate
} from "react-router-dom";
// import 'slicknav/slicknav.min.css'; // Import slicknav styles
// import 'slicknav';

const Navbar = () => {
    const navigate = useNavigate();
    const [isPaymentDone, setIsPaymentDone] = useState(localStorage.getItem('isPaymentDone'));
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    useEffect(() => {
        const storedIsPaymentDone = localStorage.getItem('isPaymentDone');
        setIsPaymentDone(storedIsPaymentDone);
    });

    // useEffect(() => {
    //     // Run your slicknav initialization logic here
    //     const menu = $('ul#navigation');
    
    //     if (menu.length) {
    //       menu.slicknav({
    //         prependTo: ".mobile_menu",
    //         closedSymbol: '+',
    //         openedSymbol: '-'
    //       });
    //     }
    
    //     // Cleanup when component unmounts
    //     return () => {
    //       // Destroy slicknav when component unmounts to avoid memory leaks
    //       if (menu.length) {
    //         menu.slicknav('destroy');
    //       }
    //     };
    //   }, []);
 
    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        localStorage.removeItem('isPaymentDone');
        localStorage.removeItem('paymentTrackingId');

        // Redirect the user to the login page
        setTimeout(() => {
            // Redirect the user to the dashboard page
            navigate("/");
        }, 100);

    };

    return (
        <>
            {/* HEADER */}
    <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
                <div className="preloader-circle"></div>
                <div className="preloader-img pere-text">
                    <img src="images/logo/wehvs-logo-1.jpeg" alt=""/>
                </div>
            </div>
        </div>
    </div>
            <header>
                <div className="header-area header-transparrent">
                    <div className="headder-top header-sticky">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-2">
                                <div className="logo">
                                    <a href="/"><img src="/images/logo/wehvs-logo-1.jpeg" width="220px" alt="WEHVS Home Logo" /></a>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-8">
                                <div className="menu-wrapper">
                                    <div className="main-menu">
                                        <nav className="d-none d-lg-block">
                                            <ul id="navigation">
                                                {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
                                                {userRole === "User" && (
                                                    <>
                                                        <li><Link to="/user/apply-certificate">User Request</Link></li>
                                                        <li><Link to="/user/jobs">Job Openings</Link></li>
                                                    </>
                                                )}
                                                {userRole === "Employer" && (
                                                    <>
                                                        <li><Link to="/user-request">User Request List</Link></li>
                                                        <li><Link to="/job-list">Job Dashboard</Link></li>
                                                    </>
                                                )}

                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="header-btn d-none f-right d-lg-block">
                                        {userRole === "Employer" && (
                                            <Link to="/employer/profile" className="button button-contactForm boxed-btn btn-login mr-3">Employer Profile</Link>
                                        )}
                                        {userRole === "User" && (
                                            <>
                                                <Link to="/user/profile" className="button button-contactForm boxed-btn btn-login mr-3">User Profile
                                                    {isPaymentDone == "true" && (
                                                        <img className="verified-user" src="/images/verified-user-2.png" width="24px"></img>
                                                    )}
                                                </Link>
                                            </>
                                        )}
                                        {userId ? (
                                            <Link onClick={handleLogout} className="button button-contactForm boxed-btn btn-login mr-3">Logout</Link>
                                        ) : (
                                            <Link to="/login" className="button button-contactForm boxed-btn btn-login mr-3">Login / Sign up</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="mobile_menu d-block d-lg-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Render child routes */}
            <Outlet />
        </>
    );
};

export default Navbar;

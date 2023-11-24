import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');

        // Redirect the user to the login page
        navigate("/login");
    };

    return (
        <>
            {/* HEADER */}
            <div className="header-area header-transparrent">
                <div className="headder-top header-sticky">
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
                                            <li><Link to="/dashboard">Dashboard</Link></li>
                                            {userRole === "User" && (
                                                <>
                                                    <li><Link to="/user/apply-certificate">User Request</Link></li>
                                                </>
                                            )}
                                             {userRole === "Employer" && (
                                                <>
                                                    <li><Link to="/user-request">User Request List</Link></li>
                                                </>
                                            )}
                                            {userRole !== null && (
                                                <>
                                                    <li><Link to="/membership">Membership</Link></li>
                                                </>
                                            )}

                                            <li><a href="job_listing.html">Find a Job</a></li>
                                            <li><a href="about.html">About</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="header-btn d-none f-right d-lg-block">
                                    {userRole === "Employer" && (
                                        <Link to="/employer/profile" className="button button-contactForm boxed-btn btn-login mr-3">Employer Profile</Link>
                                    )}
                                    {userRole === "User" && (
                                        <>
                                            <Link to="/user/profile" className="button button-contactForm boxed-btn btn-login mr-3">User Profile</Link>
                                        </>
                                    )}
                                    {userId ? (
                                            <Link onClick={handleLogout} className="button button-contactForm boxed-btn btn-login mr-3">Logout</Link>
                                        // <button onClick={handleLogout} className="button button-contactForm boxed-btn btn-login mr-3">Logout</button>
                                    ) : (
                                        <Link to="/login" className="button button-contactForm boxed-btn btn-login mr-3">Login</Link>
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
            {/* Render child routes */}
            <Outlet />
        </>
    );
};

export default Navbar;

import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/employees">
            Employee Management System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarEms"
            aria-controls="navbarEms"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarEms">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/employees">
                  Employee List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee/create">
                  Create Employee
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
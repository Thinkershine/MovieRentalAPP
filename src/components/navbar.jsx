import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="nav navbar-light bg-light justify-content-center">
      <NavLink to="/" className="navbar-brand nav-link btn btn-primary">
        RentAVideo
      </NavLink>
      <NavLink to="/movies" className="nav-link btn btn-primary">
        Movies
      </NavLink>
      <NavLink to="/customers" className="nav-link btn btn-primary">
        Customers
      </NavLink>
      <NavLink to="/rentals" className="nav-link btn btn-primary">
        Rentals
      </NavLink>
      <NavLink to="/login" className="nav-link btn btn-primary">
        Login
      </NavLink>

      <h3>
        Total Items:
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </h3>
    </nav>
  );
};

export default NavBar;

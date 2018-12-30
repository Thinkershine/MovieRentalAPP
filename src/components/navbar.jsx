import React from "react";

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand btn btn-primary" href="#">
        NavBar
      </a>
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

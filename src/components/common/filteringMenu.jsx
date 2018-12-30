import React, { Component } from "react";
import PropTypes from "prop-types";

const FilteringMenu = props => {
  const items = props.items.map(item => {
    return <li className="list-group-item">{item.name}</li>;
  });
  return (
    <div>
      <h2>{props.title}</h2>
      <ul className="list-group">
        <li className="list-group-item">All {props.title}</li>
        {items}
      </ul>
    </div>
  );
};

export default FilteringMenu;

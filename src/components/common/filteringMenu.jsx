import React, { Component } from "react";
import PropTypes from "prop-types";

const FilteringMenu = props => {
  const items = props.items.map(item => {
    console.log("Props Active? ", props.activeItem);
    console.log("Item Genre ", item.name);
    return (
      <li
        className={
          props.activeItem === item.name
            ? "list-group-item active"
            : "list-group-item"
        }
      >
        {item.name}
      </li>
    );
  });
  return (
    <div>
      <h2>{props.title}</h2>
      <ul className="list-group">
        <li
          className={
            props.activeItem === "all-genres"
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          All {props.title}
        </li>
        {items}
      </ul>
    </div>
  );
};

export default FilteringMenu;

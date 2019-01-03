import React, { Component } from "react";
import PropTypes from "prop-types";

const FilteringMenu = props => {
  const items = props.items.map(item => {
    return (
      <li
        key={item.name}
        className={
          props.activeItem === item.name
            ? "list-group-item active"
            : "list-group-item"
        }
        onClick={() => props.onClick(item)}
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
          key="all-genres"
          className={
            props.activeItem === "all-genres"
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => props.onClick("all-genres")}
        >
          All {props.title}
        </li>
        {items}
      </ul>
    </div>
  );
};

export default FilteringMenu;

import React from "react";

const ListGroup = props => {
  // Properties to make ListGroup Component REUSABLE
  // Access Data with Named Object Properties
  // Control How those Properties are Named
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;

  return (
    <ul className="list-group">
      <li
        key="all-genres"
        className={
          props.activeItem === "all-genres"
            ? "list-group-item active"
            : "list-group-item"
        }
        onClick={() => props.onItemSelect({ name: "all-genres" })}
      >
        All Genres
      </li>
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

// Default Properties to Simplify Interface
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;

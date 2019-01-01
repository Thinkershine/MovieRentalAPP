import React from "react";

const ListGroup = props => {
  // Properties to make ListGroup Component REUSABLE
  // Access Data with Named Object Properties
  // Control How those Properties are Named
  const { items, textProperty, valueProperty } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li key={item[valueProperty]} className="list-group-item">
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;

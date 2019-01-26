import React from "react";

const Input = ({ name, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;

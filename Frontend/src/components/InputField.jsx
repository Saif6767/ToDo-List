import React from "react";

const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded-md px-4 py-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  );
};

export default InputField;

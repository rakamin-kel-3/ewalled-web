import classNames from "classnames";
import React from "react";

const Input = ({ type, name, value, onChange, placeholder, classname }) => {
  return (
    <input
      className={classNames(
        classname,
        "rounded-md px-5 py-3 bg-[#FAFBFD] text-black w-full text-md"
      )}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;

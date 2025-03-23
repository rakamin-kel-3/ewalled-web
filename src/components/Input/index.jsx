import classNames from "classnames";
import React from "react";

const Input = ({ type, name, value, onChange, placeholder, classname }) => {
  return (
    <input
      className={classNames(
        classname,
        "rounded-md px-5 py-4 bg-[#FAFBFD] text-black w-full text-md placeholder:font-semibold placeholder:text-black"
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

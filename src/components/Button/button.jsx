import classNames from "classnames";
import React from "react";

const Button = ({ onClick, label, classname }) => {
  return (
    <button
      className={classNames(
        classname,
        "bg-[#0061FF] px-5 py-2 rounded-md text-white font-bold"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

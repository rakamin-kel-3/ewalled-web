import classNames from "classnames";
import React from "react";

const Button = ({ onClick, label, classname, isLoading }) => {
  return (
    <button
      className={classNames(
        classname,
        "bg-[#0061FF] px-5 py-2 rounded-md text-white font-bold active:bg-[#0011ff]"
      )}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;

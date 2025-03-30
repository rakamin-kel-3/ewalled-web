import React from "react";

const SelecLabel = ({ label, name, options, labelDefault, ...rest }, ref) => {
  return (
    <div className="flex pe-10 shadow-input rounded-3xl bg-light mt-8">
      <p className="px-10 py-4 font-bold text-xl bg-[#EDEDED] rounded-3xl">
        {label}
      </p>
      <select
        ref={ref}
        name={name}
        className="text-md font-light w-full ps-10 bg-light focus:outline-none"
        id={name}
        {...rest}
      >
        <option value="" disabled selected>
          {labelDefault}
        </option>
        {options.map((item, key) => (
          <option value={item.value} key={key}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelecLabel;

import React from "react";

const BaseContainer = ({ children }) => {
  return (
    <div className="p-3 md:p-10 bg-white rounded-3xl">
      {children}
    </div>
  );
};

export default BaseContainer;

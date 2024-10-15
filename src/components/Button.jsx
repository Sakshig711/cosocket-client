import React from "react";

const Button = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-orange-500 font-semibold active:bg-orange-400 hover:bg-orange-600 cursor-pointer text-white py-[6px] px-4 shadow-md rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

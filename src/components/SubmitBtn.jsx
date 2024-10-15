import React from "react";

const SubmitBtn = ({ children, isLoading, className }) => {
  return (
    <button
      type="submit"
      className={`${
        isLoading
          ? "bg-gray-800 cursor-not-allowed"
          : "bg-gray-900 hover:bg-black"
      } ${className} w-full font-semibold text-white py-[9px] px-4 shadow-md rounded-sm flex justify-center items-center`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-3"></div>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitBtn;

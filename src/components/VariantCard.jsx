import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const VariantCard = ({ variant, className }) => {
  return (
    <div
      className = {`rounded-sm overflow-hidden bg-white ${className} shadow-custom`}
    >
      {/* Title */}
      <div className="w-full h-full px-6 flex flex-col justify-between py-4">
        <p className="text-gray-600 mt-2 flex-1">
          {Object.entries(variant).map(([key, value], idx) => (
            <div
              key={idx}
              className="flex justify-between items-center gap-4 mt-1"
            >
              <div className="capitalize text-black font-semibold">{key}</div>
              <div className="italic">
                {Array.isArray(value)
                  ? value.slice(0, 2).map((element, index) => (
                      <span key={index}>
                        {element}
                        {index !== value.slice(0, 2).length - 1 && ", "}
                      </span>
                    ))
                  : value.slice(0, 22)}
              </div>
            </div>
          ))}
        </p>
        <Link to={`/operations/${variant.name}`}>
          <Button className="w-full mt-4 !hover:bg-gray-800 !bg-gray-700">Customization</Button>
        </Link>
      </div>
    </div>
  );
};

export default VariantCard;

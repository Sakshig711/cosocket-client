import React from "react";


const VariantCard = ({ key, variant, onViewDetails, image }) => {
  return (
    <div className="border shadow-lg rounded-lg overflow-hidden bg-white transition-transform transform hover:scale-105">
      {/* Variant Image */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        <img
          src={variant.image || image}
          alt={variant.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Variant Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {variant.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {variant.description || "No description available."}
        </p>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(variant)}
          className="mt-4 w-full bg-gray-700 hover:bg-gray-800 text-white font-medium py-1.5 px-4 rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VariantCard;

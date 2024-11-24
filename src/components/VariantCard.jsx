import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/fa";
import { useGetIconMutation } from "../store/slices/gptApiSlice";

const VariantCard = ({ variant, onViewDetails }) => {
  const [iconName, setIconName] = useState(null); // State to store the fetched icon name
  const [getIcon] = useGetIconMutation(); // Initialize the mutation

  // Fetch the icon name based on the variant name
  const fetchIcon = async () => {
    try {
      const response = await getIcon(variant.name).unwrap(); // Call the mutation
      setIconName(response.data.iconName || "FaClipboardList"); // Default to a generic icon if none is returned
    } catch (error) {
      console.error("Error fetching icon:", error);
      setIconName("FaClipboardList"); // Default to a generic icon in case of an error
    }
  };

  useEffect(() => {
    fetchIcon();
  }, [variant.name]);

  // Display only the first half of attributes
  const attributes = Object.entries(variant);
  const firstHalf = attributes.slice(0, Math.ceil(attributes.length / 2));

  // Dynamically render the icon component
  const IconComponent = iconName && Icons[iconName] ? Icons[iconName] : Icons.FaClipboardList;

  return (
    <div
      className={`border shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105`}
    >
      {/* Iconography Header */}
      <div className="w-full h-24 flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-100">
        {/* Render the fetched icon */}
        <IconComponent className="text-gray-700 text-3xl" />
      </div>

      {/* Variant Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {variant.name || "Unnamed Variant"}
        </h3>

        {/* Display Half of the Attributes */}
        <ul className="text-sm text-gray-600 space-y-1">
          {firstHalf.map(([key, value], index) => (
            <li key={index}>
              <span className="font-medium capitalize">{key}: </span>
              {value || "N/A"}
            </li>
          ))}
        </ul>

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

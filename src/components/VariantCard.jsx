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

  // Dynamically render the icon component
  const IconComponent = iconName && Icons[iconName] ? Icons[iconName] : Icons.FaClipboardList;

  // Convert attributes into key-value pairs
  const attributes = Object.entries(variant);

  return (
    <div className="border w-full shadow-lg rounded-lg overflow-hidden bg-white transition-transform transform  max-w-sm mx-auto">
      {/* Header Section */}
      <div className="flex w-full items-center gap-4 p-4 bg-gradient-to-r from-gray-300 to-gray-200">
        <div className="p-3 bg-white rounded-full text-gray-700 shadow-md">
          <IconComponent className="text-xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 truncate">{variant.name || "Unnamed Variant"}</h3>
      </div>

      {/* Attributes Section */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {attributes.map(([key, value], index) => (
          <div
            key={index}
            className="flex items-center bg-gray-50 p-2 rounded-lg shadow-sm"
          >
            
            <div className="flex-grow">
              <p className="font-semibold text-gray-800 capitalize truncate">{key}</p>
              <p className="text-sm text-gray-600 truncate">{value || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t">
        <button
          onClick={() => onViewDetails(variant)}
          className="w-full bg-gray-800 text-white font-medium py-1.5 px-4 rounded-lg shadow-md hover:bg-black transition-transform transform"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default VariantCard;

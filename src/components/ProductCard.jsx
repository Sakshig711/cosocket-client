import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const ProductCard = ({ imgUrl, name, description, className, slug }) => {
  return (
    <div className={`x w-full ${className} rounded shadow-custom bg-white p-5`}>
      <div className="w-full aspect-square mb-7 overflow-hidden rounded">
        <img
          className="w-full h-full object-cover"
          src={imgUrl}
          alt="Product Image"
        />
      </div>

      <div className="content text-gray-950 text-md">
        <div className="text-center font-bold">
          <div>{name}</div>
        </div>
        <div className="text-center text-sm mt-2 italic font-light">
          <div>{description.slice(0, 75)}...</div>
        </div>
        <Link to={`/products/${slug}`}>
          <Button className="w-full mt-4">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

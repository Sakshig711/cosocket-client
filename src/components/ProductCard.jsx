import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const ProductCard = ({ imgUrl, name, price, materials, className, slug }) => {
  return (
    <div className={`x w-full ${className} rounded shadow-custom bg-white p-5`}>
      <div className="w-full aspect-square mb-5 overflow-hidden rounded">
        <img
          className="w-full h-full object-cover"
          src={imgUrl}
          alt="Product Image"
        />
      </div>

      <div className="content text-gray-950 text-md">
        <div className="name flex justify-between items-c enter mb-3">
          <div className="font-bold">Name</div>
          <div>{name}</div>
        </div>
        <div className="price flex justify-between items-center mb-3">
          <div className="font-bold">Price</div>
          <div>{price}</div>
        </div>
        <div className="materials flex justify-between items-center">
          <div className="font-bold">Materials</div>
          <div>
            {materials.slice(0, 1).map((material, index) => (
              <span key={index}>
                {material}
                {index !== materials.slice(0, 1).length - 1 && ", "}
              </span>
            ))}
            {materials.length > 2 && <span>, ...</span>}
          </div>
        </div>
        <Link to={`/products/${slug}`}>
          <Button className="w-full mt-5">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

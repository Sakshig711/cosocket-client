import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useGetChildrenMutation } from "../store/slices/childrenApiSlice";
import { BarLoader } from "react-spinners";
import Loader from "../components/Loader";

const Children = () => {
  const { slug } = useParams();

  const [children, setChildren] = useState([]);
  const [getChildren, { isLoading }] = useGetChildrenMutation();

  // Function to fetch all products of particular id
  const fetchChildren = async () => {
    try {
      const { data } = await getChildren(slug).unwrap();
      setChildren(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, [slug]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="py-4 mt-8 md:px-10 px-5">
          {/* <div className="flex justify-start sm:w-fit mx-auto shadow-lg items-stretch">
            <div className="w-52">
              <img
                src={children.image}
                alt={children.name}
                className="w-full aspect-video h-full object-cover rounded-tl rounded-bl"
              />
            </div>
            <div className="w-full flex flex-col justify-center rounded-tr rounded-br items-start bg-gray-800 py-4 sm:py-2 ps-4 pe-8">
              <h1 className="text-2xl font-bold text-white">{children.name}</h1>
              <p className="text-[11px] text-white">
                {children.description && children.description.slice(0, 75)}
              </p>
            </div>
          </div> */}
          {/* Root Category */}
          <div className="root-category w-full grid grid-cols-1 md:grid-cols-12 md:gap-6 gap-10">
            <div className="flex justify-center items-center gap-3 md:col-span-4 md:me-auto">
              <img
                src={children.image}
                alt={children.name}
                className="w-12 h-12 rounded shadow-custom"
              />
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-2xl font-bold">{children.name}</h1>
                <p className="text-[11px]">{children.description && children.description.slice(0, 75)}</p>
              </div>
            </div>
            <div className="flex p-2 gap-10 justify-center items-center flex-wrap md:col-span-8 md:ms-auto">
              <div className="price-range flex-grow flex justify-center items-center gap-3 flex-wrap">
                <label htmlFor="range" className="text-md font-semibold">
                  Price Range:{" "}
                </label>
                <input
                  type="range"
                  className="h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer range-thumb"
                />
              </div>
              <div className="brand flex-grow flex justify-center items-center gap-3 flex-wrap">
                <label htmlFor="brand" className="text-md font-semibold">
                  Brand:{" "}
                </label>
                <select name="brand" id="brand">
                  <option value="volvo">Volvo</option>
                </select>
              </div>
              <div className="materials flex-grow flex justify-center items-center gap-3 flex-wrap">
                <label htmlFor="materials" className="text-md font-semibold">
                  Materials:{" "}
                </label>
                <select name="materials" id="materials">
                  <option value="volvo">Volvo</option>
                </select>
              </div>
              <div className="sort flex-grow flex justify-center items-center gap-3 flex-wrap">
                <label htmlFor="sort" className="text-md font-semibold">
                  Sorted By:{" "}
                </label>
                <select name="sort" id="sort">
                  <option value="lowToHigh">Low to high</option>
                  <option value="highToLow">High to low</option>
                  <option value="AtoZ">A to Z</option>
                  <option value="ZtoA">Z to A</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-100 mt-8"></div>

          {/* Subcategory Section */}
          {children.children &&
            children.children.map((subCategory, index) => (
              <div className="mt-10" key={index}>
                <div className="flex justify-start items-center gap-3 md:col-span-4 md:me-auto">
                  <img
                    src={subCategory.image}
                    alt={subCategory.name}
                    className="w-9 h-9 rounded-full shadow-custom object-cover"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold">{subCategory.name}</h1>
                    <p className="text-[8px] -mt-[2px]">
                      {subCategory.description}
                    </p>
                  </div>
                </div>
                {/* Products goes here */}
                <div className="grid gap-8 mt-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center">
                  {subCategory.products &&
                    subCategory.products.map((element, index) => (
                      <ProductCard
                        key={index}
                        imgUrl={element.image}
                        name={element.name}
                        slug={element.slug}
                        description={element.description}
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </Layout>
  );
};

export default Children;

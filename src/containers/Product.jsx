import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useGetProductMutation } from "../store/slices/productSlice";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { IoMdBusiness, IoMdRefreshCircle } from "react-icons/io";
import { LuInspect } from "react-icons/lu";
import { FaHouseUser } from "react-icons/fa";
import VariantCard from "../components/VariantCard";
import { useGetVariantsMutation } from "../store/slices/gptApiSlice";
import Loader from "../components/Loader";
import SubmitBtn from "../components/SubmitBtn";
import { BarLoader, ScaleLoader } from "react-spinners";

const Product = () => {
  const [specs, setSpecs] = useState("");
  const [getProduct, { isLoading: isLoading2 }] = useGetProductMutation();
  const [getVariants, { isLoading }] = useGetVariantsMutation();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState(null);
  const { product: productSlug } = useParams();

  const fetchProducts = async () => {
    try {
      const { data } = await getProduct(productSlug).unwrap();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVariants = async () => {
    try {
      const { data } = await getVariants({
        product: product.name,
        data: { specs: specs },
      }).unwrap();
      setVariants(data.variants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch product when productSlug changes
  }, [productSlug]);

  useEffect(() => {
    if (product) {
      fetchVariants(); // Fetch variants when the product has been fetched and set
    }
  }, [product]); // Trigger fetching variants whenever the product changes

  return (
    <Layout>
      {isLoading2 ? (
        <Loader />
      ) : (
        <div className="md:p-10 p-5 w-full mt-3 mb-10 flex md:flex-row flex-col justify-center md:gap-12 gap-10">
          {product && (
            <div className="product-details md:w-[40%]">
              <h1 className="text-2xl font-bold text-black mb-10">
                {product.name}
              </h1>
              <div className="w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[90%] md:mx-0"
                />
              </div>
              <p className="md:text-base text-sm text-gray-600 mt-6">
                {product.description}...
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {product.materials &&
                  product.materials.map((material, index) => (
                    <div
                      key={index}
                      className="border border-orange-600 text-sm font-semibold px-2 py-0.5 rounded text-orange-600"
                    >
                      {material}
                    </div>
                  ))}
              </div>
              <div className="my-4 relative">
                <h2 className="text-lg text-gray-900 font-bold">Variations</h2>
                <p className="text-sm text-gray-800">
                  Enter your required variations!
                </p>
                <textarea
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  className="border border-gray-300 px-3 mt-3 py-2 w-full h-32 resize-none rounded"
                  placeholder="Enter size, color, material, etc."
                />
                <button
                  onClick={fetchVariants}
                  className="flex text-base justify-between items-center my-1 w-full bg-gray-700 hover:bg-gray-800 font-semibold cursor-pointer text-white py-[6px] px-3 shadow-md rounded"
                >
                  <div>Generate more variants!</div>
                  <IoMdRefreshCircle className="text-lg" />
                </button>
              </div>
              <div className="flex gap-4 w-full justify-start items-center mt-4 flex-wrap">
                <Link to={`/operations/${product.slug}`}>
                  <Button className="flex-grow">
                    Custom Manufacturing{" "}
                    <IoMdBusiness className="inline ms-1" />{" "}
                  </Button>
                </Link>
                <Button className="flex-grow">
                  Sourcing <FaHouseUser className="inline ms-1" />
                </Button>
                <Link to={`/inspection/${product.name}`}>
                  <Button className="flex-grow">
                    Inspection <LuInspect className="inline ms-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="md:w-[60%] w-full mx-auto">
            <h1 className="text-2xl font-bold text-black mb-10">Variants</h1>
            {/* Loader */}
            {isLoading ? (
              <div className="w-full h-full flex justify-start items-start mb-8">
                <BarLoader color="#1F2937" speedMultiplier={2} />
              </div>
            ) : (
              <div className="grid xl:grid-cols-2 gap-8">
                {variants &&
                  variants.map((variant, index) => (
                    <VariantCard key={index} variant={variant} />
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Product;

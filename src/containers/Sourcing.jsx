import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { CiLocationOn } from "react-icons/ci";
import { useGetSourcingMutation } from "../store/slices/gptApiSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Sourcing = () => {
  const { product } = useParams();
  const [getSourcing, { isLoading }] = useGetSourcingMutation();
  const [sourcing, setSourcing] = useState({});

  const fetchSourcing = async () => {
    try {
      const { data } = await getSourcing(product).unwrap();
      setSourcing(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    fetchSourcing();
  }, [product]);

  return (
    <Layout className={"bg-gray-100"}>
      { (isLoading)  ? (
        <Loader />
      ) : (
        <div className="bg-gray-100 min-h-screen md:px-10 py-10 px-5">
          <div className=" w-fit mx-auto py-2 px-2 mb-8">
            {/* Page Header */}
            <h1 className="text-3xl font-bold text-center mb-2">
              Sourcing for {sourcing.product_name}
            </h1>
            {/* Product Specifications */}
            <p className="text-lg text-center text-gray-600">
              {sourcing.specifications}
            </p>
          </div>

          {/* Supplier Cards */}
          <div className="flex justify-start items-center flex-wrap gap-6 mb-8">
            {sourcing?.suppliers?.map((supplier, index) => (
              <div
                key={index}
                className={`bg-black flex-grow flex-shrink basis-60 p-4 rounded shadow-custom-sm`}
              >
                <h2 className="text-white text-xl font-semibold mb-1">
                  {supplier.name}
                </h2>
                <p className="text-gray-100 text-sm">
                  <CiLocationOn className="inline" /> {supplier.location}
                </p>
              </div>
            ))}
          </div>

          {/* MOQ Variants Section */}
          <h2 className="text-2xl font-bold mb-4">MOQ Variants</h2>
          <div className="flex justify-start items-center flex-wrap  gap-6 mb-8">
            {sourcing?.moq_variants?.map((variant, index) => (
              <div
                key={index}
                className="bg-white border-2 border-black px-4 py-1.5 w-full md:w-fit rounded"
              >
                <p className="text-lg font-semibold">
                  {variant.quantity} units - {variant.description}
                </p>
              </div>
            ))}
          </div>

          {/* Lead Time and Price Range */}
          <div className="flex flex-wrap justify-start items-center gap-6 mb-8">
            <div className="bg-white border-2 border-black px-4 py-1.5 w-full md:w-fit rounded">
              <p className="text-lg font-semibold">
                Lead Time : {" "}
                <span className="text-gray-700">{sourcing.lead_time}</span>
              </p>
            </div>
            <div className="bg-white border-2 border-black px-4 py-1.5 w-full md:w-fit rounded">
              <p className="text-lg font-semibold">
                Price Range : {" "}
                <span className="text-gray-700">{sourcing.price_range}</span>
              </p>
            </div>
          </div>

          {/* Quality Certifications */}
          <h2 className="text-2xl font-bold mb-4">Quality Certifications</h2>
          <div className="flex flex-wrap justify-start items-center gap-5 mb-8">
            {sourcing?.quality_certifications?.map((cert, index) => (
              <div
                key={index}
                className="bg-white px-4 py-1 border-2 border-red-700 rounded text-red-700"
              >
                <p className="text-md font-bold">{cert}</p>
              </div>
            ))}
          </div>

          {/* Potential Cost and Notes */}
          <div className="bg-teal-700 py-2 px-3 md:px-5 md:w-fit flex justify-between items-center gap-3 rounded mb-8">
            <h3 className="font-bold text-white text-lg">Potential Cost </h3>
            <p className="text-white font-bold">{sourcing.potential_cost}</p>
          </div>
          <div className=" flex justify-start items-stretch rounded">
            <h3 className="font-bold bg-black text-white px-4 py-2 flex justify-center items-center text-lg rounded-tl rounded-bl">
              Note{" "}
            </h3>
            <p className="text-gray-600 font-semibold bg-gray-200 w-full px-4 text-lg py-2 rounded-tr rounded-br">
              {sourcing.notes}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Sourcing;

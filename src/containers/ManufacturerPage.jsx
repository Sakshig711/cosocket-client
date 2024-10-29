// src/ManufacturerList.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useGetTopManufacturersMutation } from "../store/slices/manufacturerApiSlice";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const ManufacturerPage = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [getTopManufacturers, { isLoading }] = useGetTopManufacturersMutation();

  const fetchManufacturers = async () => {
    try {
      const { data } = await getTopManufacturers().unwrap();
      setManufacturers(data);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-white py-10 px-5">
          <h1 className="md:text-3xl w-fit mx-auto text-xl pb-2 border-b-2 border-black font-bold text-center text-black mb-10">
            Explore our Top Manufacturers!
          </h1>

          <div className="max-w-6xl mx-auto space-y-6">
            {manufacturers.map((manufacturer, index) => (
              <ManufacturerRow
                key={manufacturer._id}
                manufacturer={manufacturer}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

const ManufacturerRow = ({ manufacturer, isEven }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <motion.div
      className={`p-6 rounded-md shadow ${
        isEven ? "bg-red-50" : "bg-gray-100"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {manufacturer.name}
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">Industry:</span>{" "}
            {manufacturer.industry}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Location:</span>{" "}
            {manufacturer.location}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Rating:</span> {manufacturer.rating}{" "}
            ⭐
          </p>
        </div>
        <button
          onClick={toggleDetails}
          className={`px-4 py-2 ${
            isEven
              ? "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300"
              : "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300"
          }  text-white rounded-md shadow-md focus:outline-none focus:ring-2 `}
        >
          {showDetails ? "Hide" : "Contact"}
        </button>
      </div>

      {showDetails && (
        <motion.div
          className="mt-4 p-4 bg-white shadow-custom-sm rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {manufacturer.contact.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {manufacturer.contact.phone}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManufacturerPage;

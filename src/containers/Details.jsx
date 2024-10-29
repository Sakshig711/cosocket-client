import React, { useEffect, useState } from "react";
import { useGetManufacturerByIDMutation } from "../store/slices/manufacturerApiSlice";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import detailsImage from "../assets/details3.png";
import Loader from "../components/Loader";
import { FiMail, FiPhone } from "react-icons/fi";

const Details = () => {
  // State Variables
  const [manufacturer, setManufacturers] = useState(null);

  // Importing function to do API calls
  const [getManufacturer, { isLoading }] = useGetManufacturerByIDMutation();

  // Getting ID from params
  const { id } = useParams();

  // Function to fetch manufacturer based on ID
  const fetchManufacturer = async () => {
    try {
      const { data } = await getManufacturer(id).unwrap();
      setManufacturers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Loading data when page is loaded
  useEffect(() => {
    fetchManufacturer();
  }, [id]);

  return (
    <Layout className={"bg-gray-100"}>
      {!manufacturer ? (
        <Loader />
      ) : (
        <div className="md:p-10 p-3 flex flex-wrap gap-0 justify-center items-stretch my-5 bg-gray-100">
          <div className="image-gallery bg-gray-800 md:scale-105 scale-1 w-full md:basis-[43%] flex justify-end items-center rounded-sm">
            <div className="image w-full">
              <img src={detailsImage} className="w-full cover" alt="" />
            </div>
          </div>
          <div className="container md:basis-[53%] md:p-8 p-4 md:ps-10 bg-gray-100 shadow-custom rounded-sm">
            <h1 className="md:text-3xl text-2xl font-bold w-fit mb-4 pb-2 border-black border-b-2">
              {manufacturer.name}
            </h1>
            <p className="text-lg mb-2 mt-4">
              <strong>Industry:</strong> {manufacturer.industry}
            </p>
            <p className="text-lg mb-2">
              <strong>Location:</strong> {manufacturer.location}
            </p>
            <p className="text-lg mb-4">
              <strong>Rating:</strong> {manufacturer.rating} ⭐
            </p>
            <div className="mb-4">
              <div className="flex gap-5 flex-wrap justify-start items-center">
                <p className="bg-orange-500 flex justify-center gap-1.5 items-center py-1.5 px-3 rounded font-semibold text-white">
                  <FiMail />
                  <div>{manufacturer.contact.email}</div>
                </p>
                <p className="bg-gray-700 flex justify-center gap-1.5 items-center py-1.5 px-3 rounded font-semibold text-white">
                  <FiPhone />
                  <div>{manufacturer.contact.email}</div>
                </p>
              </div>
            </div>

            <div className="mb-4 w-full">
              <div className="flex items-center my-4">
                <div className="flex-grow basis-[0] border-t border-gray-300"></div>
                <h2 className="text-xl font-bold mx-4">Operations</h2>
                <div className="flex-grow basis-[75%] border-t border-double border-gray-300"></div>
              </div>

              {manufacturer.operations.map((operation) => (
                <div
                  key={operation._id}
                  className="mb-5 p-4 border rounded shadow-custom-sm bg-gray-200"
                >
                  <div className="flex justify-between items-center">
                  <h3 className="text-[0.9rem] text-gray-400 mb-3 tracking-wide uppercase font-[900]">
                    {operation.name}
                  </h3>
                  <h3 className="text-[1rem] text-red-500 italic mb-3 tracking-wide uppercase font-[900]">
                    ₹{operation.cost}
                  </h3>
                  </div>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="md:text-base text-sm border text-white border-gray-300 px-4 py-2 bg-black">
                            Materials Used
                          </th>
                          <th className="md:text-base text-sm border text-white border-gray-300 px-4 py-2 bg-black">
                            Tools Used
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {operation.materials.map((material, index) => (
                          <tr key={index} className="bg-white">
                            <td className="sm:text-base text-sm border border-gray-300 px-4 py-2">
                              {material}
                            </td>
                            <td className="sm:text-base text-sm border border-gray-300 px-4 py-2">
                              {operation.tools[index] || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Details;

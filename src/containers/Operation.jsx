import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import { useGetProductMutation } from "../store/slices/productApiSlice";
import {
  useGetManufacturersMutation,
  useGetOperationsMutation,
} from "../store/slices/gptApiSlice";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import custom from "../assets/custom.png";
import { FaPlusCircle } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import ManufacturerTable from "../components/ManufacturerTable";

const Operation = () => {
  const { product: productSlug } = useParams();
  const [getProduct, { isLoading: isLoading3 }] = useGetProductMutation();
  const [getOperations, { isLoading }] = useGetOperationsMutation();
  const [getManufacturers, { isLoading: isLoading2 }] =
    useGetManufacturersMutation();

  const [operations, setOperations] = useState(null);
  const [operationsFetched, setOperationsFetched] = useState(false);
  const [product, setProduct] = useState({});
  const [manufacturersMap, setManufacturersMap] = useState({}); // State to store manufacturers for each operation
  const [loadingManufacturers, setLoadingManufacturers] = useState({}); // Track loading status for each operation
  const [selectedManufacturers, setSelectedManufacturers] = useState([]); // To keep selected manufacturers into one array

  const fetchProduct = async () => {
    try {
      const { data } = await getProduct(productSlug).unwrap();
      if (data) {
        setProduct(data);
        fetchOperations(data?.name);
      } else {
        fetchOperations(productSlug);
      }
    } catch (error) {
      console.log(error);
      fetchOperations(productSlug);
    }
  };

  const fetchOperations = async (identifier) => {
    try {
      console.log(identifier);
      const { data } = await getOperations(identifier).unwrap();
      setOperations(data);
      console.log(data);
      setOperationsFetched(true);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  // Fetch manufacturers for a specific operation, if not already fetched
  const fetchManufacturers = async (
    operationId,
    operation,
    materials,
    tools
  ) => {
    setLoadingManufacturers((prev) => ({
      ...prev,
      [operationId]: true, // Set loading true for this operation
    }));

    const payload = {
      operation,
      materials,
      tools,
    };

    try {
      const { data } = await getManufacturers(payload).unwrap();
      console.log(data);

      // Update state by adding manufacturers for this specific operation
      setManufacturersMap((prev) => ({
        ...prev,
        [operationId]: data,
      }));
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    } finally {
      setLoadingManufacturers((prev) => ({
        ...prev,
        [operationId]: false, // Set loading false after fetching manufacturers
      }));
    }
  };

  const handleSelectManufacturer = (operationId, manufacturer) => {
    setSelectedManufacturers((prev) => [
      ...prev.filter((item) => item.operationId !== operationId), // Replace if already exists
      { operationId, manufacturer },
    ]);
    toast.success(`${manufacturer.name} selected for step ${operationId}`);
  };

  useEffect(() => {
    fetchProduct(); // Fetch product when productSlug changes
  }, [productSlug]);

  return (
    <Layout>
      {isLoading3 ? (
        <Loader />
      ) : (
        <div className="py-6 mt-8">
          {Object.keys(product).length > 0 ? (
            <div>
              <div className="image w-full p-10">
                <img
                  className="m-auto lg:w-[32%] md:w-[50%]"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="info flex flex-col justify-center gap-3 items-center">
                <h1 className="font-bold text-2xl border-b-2 pb-1 border-black">
                  {product.name}
                </h1>
                <p className="md:text-base text-sm text-center py-2 px-4 md:px-16">
                  {product.description}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="image w-full p-10">
                <img className="m-auto lg:w-[32%] md:w-[50%]" src={custom} />
              </div>
              <div className="info flex flex-col justify-center gap-3 items-center">
                <h1 className="font-bold text-2xl border-b-2 pb-1 border-black">
                  {productSlug}
                </h1>
                <p className="md:text-base text-sm text-center py-2 px-5">
                  Customization plan for {productSlug} variant listed below!
                </p>
              </div>
            </div>
          )}

          <div className="bg-[#fffaf5] rounded-sm py-14 px-5 md:px-10 mt-10">
            <h1 className="text-center text-orange-400 border-2 border-orange-400 w-fit mx-auto px-4 py-1 rounded tracking-wide uppercase mb-10 font-extrabold text-lg">
              Process Sheet
            </h1>
            {isLoading ? (
              <div className="w-full h-full flex justify-center items-center mb-8">
                <BarLoader color="#FB923C" speedMultiplier={2} />
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-x-8 gap-x-0 gap-y-10 md:gap-y-14">
                {operations &&
                  operations.operations.map((operation) => (
                    <div
                      key={operation.sequence}
                      className="flex flex-col w-full justify-start items-center gap-4"
                    >
                      <div className="bg-orange-500 shadow-custom text-white w-24 h-24 rounded-full flex justify-center items-center font-semibold">
                        Step {operation.sequence}
                      </div>
                      <div className="bg-white w-full shadow-lg p-4 md:p-5 rounded-lg mt-2">
                        <h1 className="font-extrabold text-xl">
                          {operation.operation}
                        </h1>
                        <p className="mt-1 text-sm">{operation.description}</p>
                        <div className="flex flex-wrap justify-start items-center gap-3 mt-3">
                          <div className="font-semibold">Materials</div>
                          {operation.materials.map((material, index) => (
                            <div
                              key={index}
                              className="border w-fit text-sm py-[1px] font-medium px-2 rounded border-orange-500 text-orange-500"
                            >
                              {material}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap justify-start items-center gap-3 mt-3">
                          <div className="font-semibold">Tools</div>
                          {operation.tools.map((tool, index) => (
                            <div
                              key={index}
                              className="border w-fit py-[1px] text-sm font-medium px-2 rounded border-gray-900 text-gray-900"
                            >
                              {tool}
                            </div>
                          ))}
                        </div>
                        <div className="italic text-sm mt-3 text-gray-500">
                          <span className="font-bold">
                            {operation.time_required}
                          </span>{" "}
                          required for {operation.operation}!
                        </div>
                        <div
                          onClick={() =>
                            fetchManufacturers(
                              operation.sequence,
                              operation.operation,
                              operation.materials,
                              operation.tools
                            )
                          }
                          className="py-1.5 shadow-lg font-semibold px-3 w-full bg-gray-700 text-white text-center rounded-sm cursor-pointer hover:bg-gray-800 mt-3"
                        >
                          {loadingManufacturers[operation.sequence] ? (
                            <div className="w-full flex justify-center items-center gap-3">
                              <div>Relevant Manufacturers</div>
                              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-[#fff] mr-2"></div>
                            </div>
                          ) : (
                            <div>Relevant Manufacturers</div>
                          )}
                        </div>
                        <div className="rounded-sm bg-[#fff]">
                          {manufacturersMap[operation.sequence] &&
                            manufacturersMap[operation.sequence]
                              .slice(0, 6)
                              .map((manufacturer, index) => (
                                <div
                                  key={index}
                                  className=" flex flex-col gap-3 border-b border-l border-r px-3 md:px-4 py-4"
                                >
                                  <div className="flex justify-between items-center flex-wrap">
                                    <div className="font-semibold text-sm md:text-base text-[#000]">
                                      {manufacturer.name}
                                    </div>
                                    <div className="font-extrabold text-sm md:text-base text-gray-700">
                                      <IoLocation className="inline text-[13px] mb-1" />{" "}
                                      {manufacturer.location.split(",")[0]}
                                    </div>
                                  </div>
                                  <div
                                    key={index}
                                    className="flex justify-stretch gap-5 items-center"
                                  >
                                    <Link
                                      to={`/manufacturer/${manufacturer._id}`}
                                      className="flex justify-between items-center w-full bg-black md:text-base text-[13px] py-1 px-3 rounded text-white font-semibold hover:bg-black shadow-custom-sm"
                                    >
                                      <div>View</div>
                                      <TbListDetails />
                                    </Link>

                                    <Link
                                      to={`#`}
                                      onClick={() =>
                                        handleSelectManufacturer(
                                          operation.sequence,
                                          manufacturer
                                        )
                                      }
                                      className="flex  justify-between items-center w-full bg-orange-500 md:text-base text-[13px] py-1 px-3 rounded text-white font-semibold hover:bg-orange-600 shadow-custom-sm"
                                    >
                                      <div>Select</div>
                                      <FaPlusCircle />
                                    </Link>
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {selectedManufacturers && (
              <div className="mt-20">
                <h1 className="py-1 w-fit md:text-start text-center mb-5 font-semibold text-xl">
                  Selected Manufacturers for Customized{" "}
                  {product?.name || productSlug}
                </h1>
                <ManufacturerTable manufacturers={selectedManufacturers} />
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Operation;

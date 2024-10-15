import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useGetProductMutation } from "../store/slices/productSlice";
import {
  useGetManufacturersMutation,
  useGetOperationsMutation,
} from "../store/slices/gptApiSlice";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";

const Operation = () => {
  const { product: productSlug } = useParams();
  const [getProduct] = useGetProductMutation();
  const [getOperations, { isLoading }] = useGetOperationsMutation();
  const [getManufacturers, { isLoading: isLoading2 }] =
    useGetManufacturersMutation();

  const [operations, setOperations] = useState(null);
  const [operationsFetched, setOperationsFetched] = useState(false);
  const [product, setProduct] = useState(null);
  const [manufacturersMap, setManufacturersMap] = useState({}); // State to store manufacturers for each operation
  const [loadingManufacturers, setLoadingManufacturers] = useState({}); // Track loading status for each operation

  const fetchProduct = async () => {
    try {
      const { data } = await getProduct(productSlug).unwrap();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOperations = async () => {
    try {
      const { data } = await getOperations(product.name).unwrap();
      console.log(data);
      setOperations(data);
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

  useEffect(() => {
    fetchProduct(); // Fetch product when productSlug changes
  }, [productSlug]);

  useEffect(() => {
    if (product && !operationsFetched) {
      fetchOperations(); // Fetch operations when the product has been fetched and set
    }
  }, [product, operationsFetched]);

  return (
    <Layout>
      <div className="py-6 mt-8">
        {product && (
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
              <p className="md:text-base text-sm text-center py-2 px-5">{product.description}</p>
            </div>
          </div>
        )}

        <div className="bg-red-50 rounded-sm shadow p-5 md:p-10 mt-10">
          <h1 className="text-center text-red-300 mb-8 font-medium text-[1.2rem]">
            Custom Manufacturing Process Sheet
          </h1>
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center mb-8">
              <BarLoader color="#FCA5A5" speedMultiplier={2} />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-x-8 gap-x-0 gap-y-10 md:gap-y-14">
              {operations &&
                operations.operations.map((operation) => (
                  <div
                    key={operation.sequence}
                    className="flex flex-col w-full justify-start items-center gap-4"
                  >
                    <div className="bg-red-600 shadow-custom text-white w-24 h-24 rounded-full flex justify-center items-center font-semibold">
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
                            className="border w-fit text-sm py-[1px] font-medium px-2 rounded border-red-600 text-red-600"
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
                            className="border w-fit py-[1px] text-sm font-medium px-2 rounded border-[#2c3e50] text-[#2c3e50]"
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
                        className="py-1.5 shadow-lg font-semibold px-3 w-full bg-[#2c3e50] text-white text-center rounded-sm cursor-pointer hover:bg-[#212d3a] mt-3"
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
                      <div className="mt-5 rounded bg-[#fff] border">
                        {manufacturersMap[operation.sequence] &&
                          manufacturersMap[operation.sequence].slice(0, 6).map(
                            (manufacturer, index) => (
                              <div
                                key={index}
                                className="flex py-4 border-b rounded px-3 md:px-4 justify-between items-center "
                              >
                                <div className="font-semibold text-sm md:text-base text-[#000]">
                                  {manufacturer.name}
                                </div>
                                <button className="bg-red-600 md:text-base text-[13px] py-1 px-3 rounded text-white font-semibold hover:bg-red-700 shadow-custom-sm">
                                  View Details
                                </button>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Operation;

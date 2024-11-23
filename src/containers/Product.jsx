import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useGetProductMutation } from "../store/slices/productApiSlice";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { IoMdBusiness, IoMdRefreshCircle } from "react-icons/io";
import { LuInspect } from "react-icons/lu";
import { FaHouseUser } from "react-icons/fa";
import VariantCard from "../components/VariantCard";
import { useGetVariantsMutation } from "../store/slices/gptApiSlice";
import Loader from "../components/Loader";
import { BarLoader } from "react-spinners";
import bg1 from "../assets/var1.webp";
import bg2 from "../assets/var2.webp";
import bg3 from "../assets/var3.webp";
import bg4 from "../assets/var4.webp";

const oddImages = [bg1, bg3];
const evenImages = [bg2, bg4];
let oddIndex = 0, evenIndex = 0;

const Product = () => {
  const [specs, setSpecs] = useState("");
  const [getProduct, { isLoading: isLoading2 }] = useGetProductMutation();
  const [getVariants, { isLoading }] = useGetVariantsMutation();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
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

  const handleViewDetails = (variant) => {
    setSelectedVariant(variant);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVariant(null);
  };

  useEffect(() => {
    fetchProducts();
  }, [productSlug]);

  useEffect(() => {
    if (product) {
      fetchVariants();
    }
  }, [product]);

  return (
    <Layout>
      {isLoading2 ? (
        <Loader />
      ) : (
        <div className="md:p-10 p-4 w-full mt-3 mb-10 flex md:flex-row flex-col justify-center md:gap-12 gap-10">
          {product && (
            <div className="product-details md:w-[40%]">
              <h1 className="text-2xl font-bold text-black mb-10">
                {product.name}
              </h1>
              <div className="w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[100%] md:mx-0"
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
              <Link to={`/operations/${product.slug}`} className="w-full">
                <Button className="w-full flex justify-start gap-2 items-center">
                  <div>
                    <IoMdBusiness className="" />
                  </div>
                  <div> Prepare process sheet & make in india </div>
                </Button>
              </Link>
              <div className="flex gap-4 justify-between items-center flex-wrap mt-4 w-full">
                <Link
                  to={`/sourcing/${product.name}`}
                  className="w-full flex-grow flex-shrink basis-[80px]"
                >
                  <Button className="w-full flex justify-start items-center">
                    <FaHouseUser className="inline me-2.5" /> Sourcing
                  </Button>
                </Link>

                <Link
                  to={`/inspection/${product.name}`}
                  className="w-full flex-grow flex-shrink basis-[80px]"
                >
                  <Button className="w-full flex justify-start items-center">
                    <LuInspect className="inline me-2.5" /> Inspection
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="md:w-[60%] w-full mx-auto">
            <h1 className="text-2xl font-bold text-black mb-10">Variants</h1>
            {isLoading ? (
              <div className="w-full h-full flex justify-start items-start mb-8">
                <BarLoader color="#1F2937" speedMultiplier={2} />
              </div>
            ) : (
              <div className="grid xl:grid-cols-2 gap-8">
                {variants &&
                  variants.map((variant, index) => {
                    let image;
                    if (index === 0 || index % 2 !== 0) {
                      image = oddImages[oddIndex];
                      oddIndex = (oddIndex + 1) % oddImages.length;
                    } else {
                      image = evenImages[evenIndex];
                      evenIndex = (evenIndex + 1) % evenImages.length;
                    }
                    return (
                      <VariantCard
                        key={index}
                        variant={variant}
                        onViewDetails={handleViewDetails}
                        image={image}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Implementation */}
      {showModal && selectedVariant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mx-4 sm:mx-auto overflow-hidden">
            {/* Modal Header */}
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
              {selectedVariant.name}
            </h2>

            {/* Scrollable Content */}
            <div className="max-h-[75vh] overflow-y-auto">
              <table className="w-full text-left mb-6 border border-gray-200 text-sm sm:text-base">
                <tbody>
                  {Object.entries(selectedVariant).map(([key, value]) => (
                    <tr key={key}>
                      <th className="border px-4 py-2 font-semibold text-gray-700 break-words sm:whitespace-nowrap">
                        {key}
                      </th>
                      <td className="border px-4 py-2 text-gray-600 break-words">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="flex w-full flex-col gap-4 mt-6">
              <div className="flex w-full items-center flex-col sm:flex-row gap-4">
              <Link to={`/operations/${selectedVariant?.name}`} className="flex-grow w-full basis-[60%]">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded flex items-center justify-center">
                  <IoMdBusiness className="mr-2" />
                  Prepare process sheet & make in India
                </Button>
              </Link>
                <Link to={`/sourcing/${selectedVariant?.name}`} className="flex-grow w-full basis-[25%]">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded flex items-center justify-center">
                    <FaHouseUser className="mr-2" />
                    Sourcing
                  </Button>
                </Link>
                <Link to={`/inspection/${selectedVariant?.name}`} className="flex-grow w-full basis-[25%]">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded flex items-center justify-center">
                    <LuInspect className="mr-2" />
                    Inspection
                  </Button>
                </Link>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 hover:bg-red-600 font-bold text-white py-1.5 px-4 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Product;

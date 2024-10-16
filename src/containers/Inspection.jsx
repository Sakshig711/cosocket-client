import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useGetInspectionStepsMutation } from "../store/slices/gptApiSlice";
import Loader from "../components/Loader";

const Inspection = () => {
  const { product } = useParams();
  const [getInspectionSteps, { isLoading }] = useGetInspectionStepsMutation();
  const [inspectionSteps, setInspectionSteps] = useState({});
  const [isInspectionSteps, setIsInspectionSteps] = useState(false);

  // Fetch inspection steps from backend
  const fetchInspectionSteps = async () => {
    try {
      const response = await getInspectionSteps(product).unwrap();
      setInspectionSteps(response.data.inspection_plan);
      setIsInspectionSteps(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!isInspectionSteps && product) {
      fetchInspectionSteps();
    }
  }, [product, isInspectionSteps]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-5 w-full">
          <h2 className="mt-2 mb-10 text-xl italic font-bold border-b-2 border-black w-fit pb-2 text-dark-gray">
            Quality Inspection Plan for {product}
          </h2>

          {/* Inspection Table - Fancy structure with cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Section for each stage */}
            {[
              {
                title: "Initial Inspection",
                steps: inspectionSteps.initial_inspection,
              },
              {
                title: "Mid Inspection",
                steps: inspectionSteps.mid_inspection,
              },
              {
                title: "Final Inspection",
                steps: inspectionSteps.final_inspection,
              },
            ].map((inspection, i) => (
              <div key={i} className="bg-gray-50 p-5 rounded shadow-custom">
                <h3 className="text-base uppercase font-extrabold text-gray-200 mb-4">
                  {inspection.title}
                </h3>

                {Object.keys(inspection.steps || {}).map((stepKey, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-5 mb-6 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-dark-gray">
                        Step {index + 1}: {inspection.steps[stepKey]?.description}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold text-black mb-2">
                        Parameters:
                      </p>
                      <ul className="flex flex-wrap justify-start items-center gap-3 font-semibold text-gray-700">
                        {inspection.steps[stepKey]?.parameters?.map(
                          (parameter, i) => (
                            <li className="border border-orange-600 text-orange-600 w-fit py-0.5 px-3 rounded" key={i}>{parameter}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <p className="font-semibold text-black mb-2">
                        Tools:
                      </p>
                      <ul className="flex flex-wrap justify-start items-center gap-3 font-semibold text-gray-700">
                        {inspection.steps[stepKey]?.tools?.map((tool, i) => (
                          <li className="border border-gray-700 text-gray-700 w-fit py-0.5 px-3 rounded" key={i}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Inspection;

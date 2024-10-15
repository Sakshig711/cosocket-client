import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useGetInspectionStepsMutation } from "../store/slices/gptApiSlice";
import Loader from "../components/Loader";
import { BarLoader } from "react-spinners";

const Inspection = () => {
  const { product } = useParams();
  const [getInspectionSteps, { isLoading }] = useGetInspectionStepsMutation();
  const [inspectionSteps, setInspectionSteps] = useState({});

  // Function to fetch inspection step for product from backend
  const fetchInspectionSteps = async () => {
    try {
      const response = await getInspectionSteps(product).unwrap();
      setInspectionSteps(response.data.inspection_plan);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInspectionSteps();
    console.log(inspectionSteps);
  }, []);

  useEffect(() => {
    console.log(inspectionSteps);
  }, [inspectionSteps]);

  return (
    <Layout>
      <div className="p-5 w-full">
        <h2 className="mt-2 mb-10 text-xl italic font-bold border-b-2 border-black w-fit pb-2">
          Quality Inspection Plan for {product}
        </h2>
        {isLoading ?
          <div className="w-full flex justify-center items-center mb-8">
          <BarLoader
            color='#000'
            speedMultiplier={2}
        />
        </div>
        : (
          <table className="w-full border-collapse shadow-custom-sm">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-orange-600 text-white text-start text-sm uppercase font-medium">
                  Inspection Stage
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-orange-600 text-white text-start text-sm uppercase font-medium">
                  Step
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-orange-600 text-white text-start text-sm uppercase font-medium">
                  Description
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-orange-600 text-white text-start text-sm uppercase font-medium">
                  Parameters
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-orange-600 text-white text-start text-sm uppercase font-medium">
                  Tools
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="step-header bg-gray-100 font-semibold">
                <td className="px-6 py-4 border-b border-gray-200" rowspan="2">
                  Initial Inspection
                </td>
                <td className="px-6 py-4 border-b border-gray-200">Step 1</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {inspectionSteps.initial_inspection?.step_1.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="parameters" className="list-disc list-inside">
                    {inspectionSteps.initial_inspection?.step_1.parameters.map(
                      (parameter, index) => (
                        <li key={index}>{parameter}</li>
                      )
                    )}
                  </ul>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="tools" className="list-disc list-inside">
                    {inspectionSteps.initial_inspection?.step_1.tools?.map(
                      (tool, index) => (
                        <li key={index}>{tool}</li>
                      )
                    )}
                  </ul>
                </td>
              </tr>
              <tr className="bg-gray-100 font-semibold">
                <td className="px-6 py-4 border-b border-gray-200">Step 2</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {inspectionSteps.initial_inspection?.step_2.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="parameters" className="list-disc list-inside">
                    {inspectionSteps.initial_inspection?.step_2.parameters?.map(
                      (parameter, index) => (
                        <li key={index}>{parameter}</li>
                      )
                    )}
                  </ul>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="tools" className="list-disc list-inside">
                    {inspectionSteps.initial_inspection?.step_2.tools?.map(
                      (tool, index) => (
                        <li key={index}>{tool}</li>
                      )
                    )}
                  </ul>
                </td>
              </tr>
              <tr className="step-header bg-gray-100 font-semibold">
                <td className="px-6 py-4 border-b border-gray-200" rowspan="2">
                  Mid Inspection
                </td>
                <td className="px-6 py-4 border-b border-gray-200">Step 1</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {inspectionSteps.mid_inspection?.step_1.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="parameters" className="list-disc list-inside">
                    {inspectionSteps.mid_inspection?.step_1.parameters.map(
                      (parameter, index) => (
                        <li key={index}>{parameter}</li>
                      )
                    )}
                  </ul>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="tools" className="list-disc list-inside">
                    {inspectionSteps.mid_inspection?.step_1.tools?.map(
                      (tool, index) => (
                        <li key={index}>{tool}</li>
                      )
                    )}
                  </ul>
                </td>
              </tr>
              <tr className="bg-gray-100 font-semibold">
                <td className="px-6 py-4 border-b border-gray-200">Step 2</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {inspectionSteps.mid_inspection?.step_2.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="parameters" className="list-disc list-inside">
                    {inspectionSteps.mid_inspection?.step_2.parameters?.map(
                      (parameter, index) => (
                        <li key={index}>{parameter}</li>
                      )
                    )}
                  </ul>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="tools" className="list-disc list-inside">
                    {inspectionSteps.mid_inspection?.step_2.tools?.map(
                      (tool, index) => (
                        <li key={index}>{tool}</li>
                      )
                    )}
                  </ul>
                </td>
              </tr>
              <tr className="step-header bg-gray-100 font-semibold">
                <td className="px-6 py-4 border-b border-gray-200" rowspan="2">
                  Final Inspection
                </td>
                <td className="px-6 py-4 border-b border-gray-200">Step 1</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {inspectionSteps.final_inspection?.step_1.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="parameters" className="list-disc list-inside">
                    {inspectionSteps.final_inspection?.step_1.parameters.map(
                      (parameter, index) => (
                        <li key={index}>{parameter}</li>
                      )
                    )}
                  </ul>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="tools" className="list-disc list-inside">
                    {inspectionSteps.final_inspection?.step_1.tools?.map(
                      (tool, index) => (
                        <li key={index}>{tool}</li>
                      )
                    )}
                  </ul>
                </td>
              </tr>
              
              <tr className="bg-gray-100 font-semibold">
                <td className="px-6 py-4 border-b border-gray-200">Step 2</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {inspectionSteps.final_inspection?.step_2.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="parameters" className="list-disc list-inside">
                    {inspectionSteps.final_inspection?.step_2.parameters?.map(
                      (parameter, index) => (
                        <li key={index}>{parameter}</li>
                      )
                    )}
                  </ul>
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <ul class="tools" className="list-disc list-inside">
                    {inspectionSteps.final_inspection?.step_2.tools?.map(
                      (tool, index) => (
                        <li key={index}>{tool}</li>
                      )
                    )}
                  </ul>
                </td>
              </tr>
             
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Inspection;

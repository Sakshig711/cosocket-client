import React from "react";

const ManufacturerTable = ({ manufacturers }) => {
  // Sort the manufacturers array by operationId in ascending order
  const sortedManufacturers = manufacturers.sort(
    (a, b) => a.operationId - b.operationId
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="px-4 py-2 text-start border border-gray-300">Step</th>
            <th className="px-4 py-2 text-start border border-gray-300">Name</th>
            <th className="px-4 py-2 text-start border border-gray-300">Industry</th>
            <th className="px-4 py-2 text-start border border-gray-300">Location</th>
            <th className="px-4 py-2 text-start border border-gray-300">Rating</th>
            <th className="px-4 py-2 text-start border border-gray-300">Operation</th>
            <th className="px-4 py-2 text-start border border-gray-300">Cost</th>
          </tr>
        </thead>
        <tbody>
          {sortedManufacturers.map((item) =>
            item.manufacturer.operations.map((operation, index) => (
              <tr key={`${item.manufacturer._id}-${operation._id}`} className="bg-white">
                {index === 0 && (
                  <>
                    <td
                      className="px-4 py-2 border border-gray-300 text-center"
                      rowSpan={item.manufacturer.operations.length}
                    >
                      {item.operationId}
                    </td>
                    <td
                      className="px-4 py-2 border border-gray-300"
                      rowSpan={item.manufacturer.operations.length}
                    >
                      {item.manufacturer.name}
                    </td>
                    <td
                      className="px-4 py-2 border border-gray-300"
                      rowSpan={item.manufacturer.operations.length}
                    >
                      {item.manufacturer.industry}
                    </td>
                    <td
                      className="px-4 py-2 border border-gray-300"
                      rowSpan={item.manufacturer.operations.length}
                    >
                      {item.manufacturer.location}
                    </td>
                    <td
                      className="px-4 py-2 border border-gray-300"
                      rowSpan={item.manufacturer.operations.length}
                    >
                      {item.manufacturer.rating}
                    </td>
                  </>
                )}
                <td className="px-4 py-2 border border-gray-300">
                  {operation.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {operation.cost? `₹${operation.cost}` : `Discuss later`}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManufacturerTable;

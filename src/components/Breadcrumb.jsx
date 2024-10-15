import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  // Split the pathname into an array, filtering out any empty strings
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex text-gray-600 py-1 ms-3">
        <li>
          <Link to="/" className="text-orange-500 font-medium hover:border-b-2 transition-all ease-in duration-75 border-orange-500">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;  // Return string which join with /
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="font-bold mx-1.5">&gt;</span>
              {isLast ? (
                <span className="text-gray-500 font-medium capitalize">{value}</span> // It is last no need to display it using link
              ) : (
                <Link to={to} className="text-orange-500 font-medium hover:border-b pe-2">
                  {value}
                </Link> // Display it using link so we can go backward
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

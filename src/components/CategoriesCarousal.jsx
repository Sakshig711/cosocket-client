import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoriesCarousal = ({ categories }) => {
  // Creating state variable for managing dropdown
  const [hoverIndex, setHoverIndex] = useState(0);

  // Handle Mouse Enter
  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  // Handle Mouse Leave
  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <>
      <div className="relative w-full py-3 px-2 flex justify-center items-center gap-2">
        <div className="cursor-pointer prev bg-white relative z-40 active:bg-gray-100 text-orange-500 shadow p-1 rounded">
          <FaArrowAltCircleLeft className="md:text-lg text-2xl" />
        </div>
        <Swiper
          spaceBetween={1}
          slidesPerView={"auto"}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          draggable={true}
          modules={[Navigation]}
          className="shadow-custom-sm"
        >
          {categories.map((element, index) => (
            <SwiperSlide key={index} className="!w-auto">
              {/* <Link to={`https://api.escuelajs.co/api/v1/categories/${element.id}/products`} replace */}
              <Link
                to={`/categories/${element.slug}`}
                className={`text-gray-950 bg-white flex justify-center items-center gap-2 cursor-pointer relative py-2 md:py-1 px-3 active:bg-gray-200 transition-all duration-300 hover:bg-gray-50 border border-e-0 `}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={element.image}
                  className="w-6 h-6 rounded-full"
                  alt={element.name}
                />
                <div>{element.name}</div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="cursor-pointer next ms-0 bg-white relative z-40 active:bg-gray-100 text-orange-500 shadow p-1 rounded">
          <FaArrowAltCircleRight className="md:text-lg text-2xl" />
        </div>
      </div>
    </>
  );
};

export default CategoriesCarousal;

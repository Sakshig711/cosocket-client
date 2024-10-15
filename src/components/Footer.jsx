import React from "react";

const Footer = () => {
  return (
    <div className="footer-section font-semibold mt-10 py-8 px-8 text-md text-white bg-gray-950">
      <div className="text-center mb-4">
        © 2024 COSOCKET | All rights reserved
      </div>
      <div className="flex justify-center items-center gap-5">
        <p>Privacy Policy</p>
        <p>Terms of Services</p>
        <p>Contact</p>
      </div>
    </div>
  );
};

export default Footer;

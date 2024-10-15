import React, { useEffect, useState } from "react";
import register from "../assets/login.jpg"; // Update this path as needed
import { FaFacebook, FaGoogle, FaMicrosoft, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/slices/usersApiSlice";
import toast from "react-hot-toast";
import { setCredentials } from "../store/slices/authSlice";
import Loader from "./Loader";
import SubmitBtn from "./SubmitBtn";

const Login = ({
  handleLoginCloseListener,
  className = "",
  visibility = false,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials(res.data.user));
      toast.success(res?.message);
      handleLoginCloseListener(false, setFormData);
      // window.location.href = "/"; // Replace with your routing logic
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div
      className={`fixed w-full h-[100vh] bg-custom-white top-0 z-50 flex p-6 justify-center items-center overflow-auto ${
        visibility ? "visible" : "invisible"
      }`}
    >
      <div
        className={`${className} text-gray-900 rounded register-container transition-all duration-500 ease-in-out relative grid md:grid-cols-3 md:mt-0 md:mb-0 mt-80 mb-40 bg-white grid-cols-1 shadow-lg md:w-[70%] md:h-[75%]`}
      >
        {/* Close Button */}
        <FaTimes
          className="absolute text-xl text-white md:text-gray-950 top-2 z-50 right-2 cursor-pointer"
          onClick={() => handleLoginCloseListener(false, setFormData)}
        />
        {/* First Part for Image */}
        <div className="image md:col-span-1 w-full h-full relative before:rounded-t before:content-[''] before:absolute before:top-0 before:w-full before:h-full before:bg-custom-black">
          <img
            className="w-full rounded-tl rounded-bl h-full object-cover z-50"
            src={register}
            alt="Login"
          />
        </div>
        {/* Second Part for Form */}
        <div className="form h-full md:col-span-2 py-8 md:px-10 px-5 bg-white">
          <h1 className="text-[1.62rem] text-gray-950 font-bold font-mont leading-normal mt-0">
            Log In to Streamline Your Orders and Sourcing!
          </h1>
          <div className="mt-10 flex justify-center items-start gap-5 flex-col w-full">
            <form
              className="flex justify-center items-start gap-5 flex-col w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border px-3 py-2 w-full"
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border px-3 py-2 w-full"
                onChange={handleChange}
                value={formData.password}
              />
              {/* <input
                type="submit"
                value={"Login"}
                className="bg-gray-900 w-full font-semibold active:bg-gray-800 hover:bg-black cursor-pointer text-white py-[9px] px-4 shadow-md rounded-sm"
              /> */}
              <SubmitBtn isLoading = {isLoading}> Login </SubmitBtn>
            </form>
            <div className="text-center w-full text-gray-950">
              New ?{" "}
              <button
                onClick={() => {
                  handleLoginCloseListener(true, setFormData);
                }}
                className="text-blue-500 font-normal"
              >
                Create new Account
              </button>{" "}
            </div>
            <div className="text-center w-full text-gray-950 -mt-4">
              Or Signup with,
            </div>
            <div className="social w-full flex md:flex-row flex-col justify-center items-center gap-5 flex-wrap md:gap-10 mt-5">
              <div className="google w-full md:w-fit flex justify-center items-center gap-3 text-lg py-1 px-4 border rounded-sm font-semibold border-red-600 text-red-600">
                <FaGoogle />
                Google
              </div>
              <div className="facebook w-full md:w-fit flex justify-center items-center gap-3 text-lg py-1 px-4 border rounded-sm font-semibold border-blue-600 text-blue-600">
                <FaFacebook />
                Facebook
              </div>
              <div className="microsoft w-full md:w-fit flex justify-center items-center gap-3 text-lg py-1 px-4 border rounded-sm font-semibold border-lime-600 text-lime-600">
                <FaMicrosoft />
                Microsoft
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

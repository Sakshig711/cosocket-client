import React, { useState } from "react";
import register from "../assets/reg1.jpg";
import userProfile from "../assets/user-profile.png";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../store/slices/usersApiSlice";
import toast from "react-hot-toast";
import { setCredentials } from "../store/slices/authSlice";
import SubmitBtn from "./SubmitBtn";

const Register = ({
  handleCloseListener,
  className = "",
  visibility = false,
}) => {
  // State Variables
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    "address.street": "",
    "address.city": "",
    "address.state": "",
    "address.postalcode": "",
    "address.country": "",
    profilePicture: null,
  });
  
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const [registerUser, { isLoading }] = useRegisterMutation();
  
  const handleUploadProfilePicture = (e) => {
    // Take a file
    const file = e.target.files[0];

    // If file exists
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
      });
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    }
  };

  // Function to handle changes in all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    
    try{
      const res = await registerUser(formDataToSubmit).unwrap();
      dispatch(setCredentials(res.data.user));
      toast.success(res?.message);
      handleCloseListener(setImagePreview, setFormData);
      //router.push("/");
    } catch(error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div
      className={`fixed w-full h-[100vh] bg-custom-white top-0 z-50 flex p-6  justify-center items-center overflow-auto ${
        visibility ? "visible" : "invisible"
      }`}
    >
      <div
        className={`${className} text-gray-950 rounded register-container transition-all duration-500 ease-in-out relative grid md:grid-cols-3 md:mt-0 md:mb-0 mt-[35rem] mb-40 bg-white grid-cols-1 shadow-lg md:w-[70%] md:h-[85%]`}
      >
        {/* Close Button */}
        <FaTimes
          className="absolute text-2xl text-white md:text-gray-950 top-3 z-50 right-3 cursor-pointer"
          onClick={() => handleCloseListener(setImagePreview, setFormData)}
        />
        {/* First Part for Image */}
        <div className="image md:col-span-1 w-full h-full relative before:rounded before:content-[''] before:absolute before:top-0 before:w-full before:h-full before:bg-custom-black">
          <img
            className="w-full rounded-tl rounded-bl h-full object-cover z-50"
            src={register}
            alt="Register"
          />
        </div>
        {/* Second Part for Form */}
        <div className="form w-full h-full md:col-span-2 py-8 md:px-10 px-5 bg-white">
          <h1 className="text-[1.62rem] text-gray-950 font-bold font-mont leading-normal">
            Register Now for a Personalized Shopping Experience!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-8 flex justify-center items-start gap-5 flex-col w-full">
              <div className="input-box lg:flex-row flex-col flex justify-start items-center w-full gap-5">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="border px-3 py-2 w-full"
                  onChange={handleChange}
                  value={formData.firstName}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="border px-3 py-2 w-full"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </div>
              <div className="input-box lg:flex-row flex-col flex justify-start items-center w-full gap-5">
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
              </div>

              <div className="flex justify-between gap-5 w-full items-center xl:flex-row flex-col">
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone"
                  className="border px-3 py-2 w-full"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                />
                <div className="profile-box w-full flex justify-start items-center gap-6">
                  <div className="box rounded-full shadow-md bg-red-300 w-[50px] h-[50px] ">
                    <img
                      src={imagePreview ? imagePreview : userProfile}
                      alt="User Profile"
                      className="w-full h-full object-cover rounded-full"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="profilePicture"
                      className="bg-gradient-to-r from-[#EAAA50] via-[#F28C50] to-[#FC5E4D] hover:bg-gradient-to-l transition-all duration-1000 ease-in-out font-semibold cursor-pointer text-white py-[6px] px-4 shadow-md rounded"
                    >
                      Upload profile
                    </label>
                    <input
                      type="file"
                      name="profilePicture"
                      className="hidden"
                      id="profilePicture"
                      accept="image/*"
                      onChange={handleUploadProfilePicture}
                    />
                  </div>
                </div>
              </div>
              <input
                type="text"
                name="address.street"
                placeholder="Street"
                className="border px-3 py-2 w-full"
                onChange={handleChange}
                value={formData["address.street"]}
              />
              <div className="input-box lg:flex-row flex-col flex justify-start items-center w-full gap-5">
                <input
                  type="text"
                  name="address.city"
                  placeholder="City"
                  className="border px-3 py-2 w-full"
                  onChange={handleChange}
                  value={formData["address.city"]}
                />
                <input
                  type="text"
                  name="address.state"
                  placeholder="State"
                  className="border px-3 py-2 w-full"
                  onChange={handleChange}
                  value={formData["address.state"]}
                />
              </div>
              <div className="input-box lg:flex-row flex-col flex justify-start items-center w-full gap-5">
                <input
                  type="number"
                  name="address.postalcode"
                  placeholder="Postal code"
                  className="border px-3 py-2 w-full"
                  onChange={handleChange}
                  value={formData["address.postalcode"]}
                />
                <input
                  type="text"
                  name="address.country"
                  placeholder="Country"
                  className="border px-3 py-2 w-full"
                  onChange={handleChange}
                  value={formData["address.country"]}
                />
              </div>

              <SubmitBtn isLoading = {isLoading}> Register </SubmitBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

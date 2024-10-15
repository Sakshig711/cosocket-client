import React, { useState } from "react";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import cover from "../assets/cover.png";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import {
  useOrderPaymentMutation,
  useUpdateProfileMutation,
  useVerifyPaymentMutation,
} from "../store/slices/usersApiSlice";
import toast from "react-hot-toast";
import { setCredentials } from "../store/slices/authSlice";
import razorpay from "../assets/razorpay.png";
import { MdOutlinePayment } from "react-icons/md";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    phoneNumber: userInfo.phoneNumber,
  });
  const [amount, setAmount] = useState(1);

  // Function to handle change in input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [orderPayment] = useOrderPaymentMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const dispatch = useDispatch();

  // Function to handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile(userData).unwrap();
      dispatch(setCredentials(res.data));
      toast.success(res?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  // Handle payment gateway
  const handlePayment = async () => {
    try {
      const res = await orderPayment({ amount }).unwrap();
      handlePaymentVerify(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Verify payment gateway
  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Cosocket",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await verifyPayment(response).unwrap();
          console.log(res);
          dispatch(setCredentials(res?.data));
          toast.success(res.message);
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
      theme: {
        color: "#F97316",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      alert("Payment failed");
    });
    rzp.open();
  };

  return (
    <Layout>
      <Breadcrumb />
      <div className="mt-10 mb-5 profile-container w-full md:w-3/4 lg:w-1/2 mx-auto flex flex-col justify-center items-center md:p-0 p-6">
        <div className="image-container relative w-full h-full">
          <div className="">
            <img
              src={cover}
              alt="coverImage"
              className="w-full sm:h-full h-[150px] object-cover "
            />
          </div>
          <div
            className="md:w-28 md:h-28 w-24 h-24 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/4 border-[8px] border-[#CCCCCC] p-[6px] bg-white" // Outer border and padding for inner border
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundImage: `url(${userInfo?.profilePicture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
        <div className="mt-20 payment-container flex flex-col justify-between items-center gap-5">
          <img src={razorpay} alt="" className="md:w-52 w-44 object-cover" />
          {userInfo.payment.status ? (
            <div className="bg-gray-100 py-1 px-5 rounded-2xl italic text-gray-400">Subscribed!</div>
          ) : (
            <Button
              onClick={handlePayment}
              className="bg-[#3395FF] hover:bg-[#072654]"
            >
              Pay to use services <MdOutlinePayment className="inline" />
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="input-fields mt-10 w-full">
          <div className="flex md:flex-row flex-col justify-between items-center md:gap-10 gap-5">
            <input
              onChange={handleChange}
              name="firstName"
              type="text"
              className="py-2 px-3 bg-[#f6f6f6] w-full rounded "
              value={userData.firstName}
            />
            <input
              onChange={handleChange}
              name="lastName"
              type="text"
              className="py-2 px-3 bg-[#f6f6f6] w-full rounded "
              value={userData.lastName}
            />
          </div>

          <div className="flex md:flex-row mt-5 flex-col justify-between items-center md:gap-10 gap-5">
            <input
              onChange={handleChange}
              name="email"
              type="email"
              className="py-2 px-3 bg-[#f6f6f6] w-full rounded "
              value={userData.email}
            />
            <input
              onChange={handleChange}
              name="phoneNumber"
              type="number"
              className="py-2 px-3 bg-[#f6f6f6] w-full rounded "
              value={userData.phoneNumber}
            />
          </div>
          <input
            type="submit"
            className="w-full mt-6 bg-orange-500 text-white font-semibold shadow cursor-pointer py-2 px-1 rounded"
            value={"Update profile"}
          />
        </form>
      </div>
    </Layout>
  );
};

export default UserProfile;

// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { FaBars, FaSearch, FaTimes, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import CategoriesCarousal from "./CategoriesCarousal";
import Register from "./Register";
import Login from "./Login";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import logoutImage from "../assets/log-out.png";
import { logout } from "../store/slices/authSlice";
import { useLogoutMutation } from "../store/slices/usersApiSlice";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useGetCategoriesMutation } from "../store/slices/childrenApiSlice";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [categories, setCategories] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const [getCategories] = useGetCategoriesMutation();

  // Menus for menu
  const menuItems = [
    "Home",
    "Source",
    "Customization",
    "Manufacturer Login",
    "Contact Us",
  ];

  const toggleMenu = (e) => {
    setMenu(!menu);
    // If search is there close it
    search && setSearch(false);
  };

  useEffect(() => {
    if (showRegister || showLogin) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showRegister, showLogin]);

  const handleCloseListener = (setImagePreview, setFormData) => {
    setShowRegister(false);
    setImagePreview("");
    setFormData({
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
  };

  const handleShowListener = () => {
    setShowRegister(true);
    setShowLogin(false);
    setMenu(false);
    setSearch(false);
  };

  const handleLoginCloseListener = (isReg = false, setFormData) => {
    setShowLogin(false);
    setFormData({
      email: "",
      password: "",
    });
    isReg && handleShowListener();
  };

  const handleLoginShowListener = () => {
    setShowLogin(true);
    setShowRegister(false);
    setMenu(false);
    setSearch(false);
  };

  const handleLogout = async () => {
    dispatch(logout());
    try {
      const res = await logoutUser().unwrap();
      toast.success(res?.message);
      //router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  // Function to get all categories
  const fetchCategories = async () => {
    try {
      const { data } = await getCategories().unwrap();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Toaster containerStyle={{ width: "100%" }} />
      <Register
        handleCloseListener={handleCloseListener}
        visibility={showRegister}
        className={
          showRegister
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 scale-0"
        }
      />
      <Login
        handleLoginCloseListener={handleLoginCloseListener}
        visibility={showLogin}
        className={
          showLogin
            ? "visible opacity-100 scale-100"
            : "invisible opacity-0 scale-0"
        }
      />
      <div className="border-b border-gray-50 header bg-gray-50 relative p-4 flex justify-between items-center">
        <Link to={"/"} className="md:w-58 w-48 h-full">
          <img
            className="w-full h-full object-cover"
            src={logo}
            alt="Cosocket"
          />
        </Link>
        <div className="hidden md:block flex-1">
          <div className="w-full justify-center flex gap-3">
            <input
              type="search"
              className="shadow border border-gray-100 w-1/2 rounded outline-none py-1 px-3"
              name="product"
              id="search"
              placeholder="Enter your product here..."
            />
            <div className="bg-gray-950 cursor-pointer shadow flex justify-center items-center p-2 rounded-full">
              <FaSearch className="text-lg text-white" />
            </div>
          </div>
        </div>
        {userInfo ? (
          <div className="hidden md:flex btn-container">
            <Link
              to={"/profile"}
              className="profile-name flex justify-center items-center gap-3"
            >
              <div className="relative w-11 h-11 shadow-custom rounded-full">
                <img
                  src={userInfo.profilePicture}
                  alt={userInfo.firstName}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-gray-950 font-bold text-md">
                {`${userInfo.firstName} ${userInfo.lastName}`}
                </div>
                <p className="text-[13px] text-gray-700 -my-0.5">{userInfo.email}</p>
              </div>
              <div>
                <img
                  className="w-9 h-9 ms-3 cursor-pointer"
                  onClick={handleLogout}
                  src={logoutImage}
                  alt="logout"
                />
              </div>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex btn-container">
            <Button className="mr-5" onClick={handleShowListener}>
              Register
            </Button>
            <Button className="mr-2" onClick={handleLoginShowListener}>
              Login
            </Button>
          </div>
        )}
        <div className="md:hidden flex gap-5 justify-center items-center ">
          <div className="bg-black cursor-pointer shadow flex justify-center items-center p-[4px] rounded-full">
            <FaUserCircle
              className=" text-xl text-white"
              onClick={() => {
                setSearch(!search);
                setMenu(false);
              }}
            />
          </div>
          <div className="">
            {!menu ? (
              <FaBars
                className="text-2xl cursor-pointer text-gray-950"
                onClick={toggleMenu}
              />
            ) : (
              <FaTimes
                className="text-2xl cursor-pointer text-gray-950"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex scale-0 w-full z-50 opacity-0 bg-orange-50 shadow p-10 flex-col transition-all ease-in duration-100 items-center ${
          search ? "opacity-100 scale-100 static" : "absolute"
        }`}
      >
        <div className="w-full justify-center flex gap-2 mb-5">
          <input
            type="search"
            className="shadow-sm border border-gray-100 w-full rounded outline-none py-2 px-3 text-black"
            name="product"
            id="search"
            placeholder="Enter your product here..."
          />
          <div className="cursor-pointer flex justify-center items-center p-2">
            <FaSearch className=" text-lg text-orange-500" />
          </div>
        </div>
        {userInfo ? (
          <div className="flex gap-5 w-full">
            <div className="profile-name flex justify-center items-center gap-3">
              <div className="relative w-11 h-11 shadow-custom rounded-full">
                <img
                  src={userInfo.profilePicture}
                  alt={userInfo.firstName}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="text-gray-950 font-bold text-md border border-gray-400 px-2 py-0.5 rounded-md">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
              <div>
                <img className="w-9 h-9 ms-3" src={logoutImage} alt="logout" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-5 w-full">
            <Button className="w-full md:w-fit" onClick={handleShowListener}>
              Register
            </Button>
            <Button
              className="w-full md:w-fit"
              onClick={handleLoginShowListener}
            >
              Login
            </Button>
          </div>
        )}
      </div>
      <div
        className={`md:static flex absolute left-0 z-50 transition-all duration-300 md:w-auto opacity-0 md:opacity-100 md:scale-100 w-full md:visible menu shadow-md border-b border-gray-50 md:flex md:flex-row flex-col gap-0 md:gap-10 justify-center ps-7 pe-4 py-4 md:py-[15px] text-white text-lg font-semibold bg-gray-950 ${
          menu ? "visible opacity-100" : "invisible"
        }`}
      >
        {menuItems &&
          menuItems.map((element, index) => (
            <div
              key={index}
              className="menu-item relative cursor-pointer text-white p-3 rounded hover:transition-all hover:bg-gray-500 black md:p-0 md:hover:bg-inherit md:before:content-[''] md:before:absolute md:before:bottom-[-2px] md:before:w-0 md:before:left-1/2 md:before:transform md:before:-translate-x-1/2 md:before:hover:w-[90%] md:before:transition-all md:before:duration-200 md:before:bg-white before:h-[2px] md:before:rounded-full"
            >
              {element}
            </div>
          ))}
      </div>
      <CategoriesCarousal categories={categories} />
    </div>
  );
};

export default Navbar;

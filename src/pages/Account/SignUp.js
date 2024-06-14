import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/actionReducers";

const SignUp = () => {
  // ============= Initial State Start here =============
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errors, setErrors] = useState({});
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      profileImage: file,
    }));
  };
  // ================= Email Validation End here ===============
  const dispatch = useDispatch();
  const handleSignUp = async (e) => {
    try {
      if (checked) {
        const newErrors = {};
        if (!formData.firstName) {
          newErrors.firstName = "Enter your first name";
        }
        if (!formData.lastName) {
          newErrors.lastName = "Enter your last name";
        }
        if (!formData.email) {
          newErrors.email = "Enter your email";
        } else if (!EmailValidation(formData.email)) {
          newErrors.email = "Enter a valid email";
        }
        if (!formData.phone) {
          newErrors.phone = "Enter your phone number";
        }
        if (!formData.password) {
          newErrors.password = "Create a password";
        } else if (formData.password.length < 8) {
          newErrors.password = "Passwords must be at least 8 characters";
        }
        if (!formData.address) {
          newErrors.address = "Enter your address";
        }
        if (!formData.city) {
          newErrors.city = "Enter your city name";
        }
        if (!formData.country) {
          newErrors.country = "Enter the country you are residing";
        }
        if (!formData.zip) {
          newErrors.zip = "Enter the zip code of your area";
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        await dispatch(signupUser(formDataToSend));

        setSuccessMsg(
          `Hello dear ${formData.firstName} ${formData.lastName}, Welcome to the OREBI Admin panel. We received your sign-up request. We are processing to validate your access. Stay connected, and additional assistance will be sent to you via email at ${formData.email}`
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          address: "",
          city: "",
          country: "",
          zip: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const router = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if (userInfo && userInfo.email && userInfo.token) {
      router("/");
    }
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with Market Wizard
              </span>
              <br />
              Sign up and make your first order now & get a big discount on your
              first three orders.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all Market Wizard services
              </span>
              <br />
              Sign up and get access to your account.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online shoppers
              </span>
              <br />
              Millions of customers trust our Market Wizard platform.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © Market Wizards
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* First Name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    First Name
                  </p>
                  <input
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.firstName}
                    </p>
                  )}
                </div>
                {/* Last Name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Last Name
                  </p>
                  <input
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. Doe"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Profile Picture
                  </p>
                  <input
                    name="profileImage"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full h-8 text-base font-medium rounded-md border-gray-400 outline-none"
                    type="file"
                  />
                  {errors.profileImage && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.profileImage}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="eg. example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.email}
                    </p>
                  )}
                </div>
                {/* Phone */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone
                  </p>
                  <input
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. +123456789"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.phone}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="at least 8 characters"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.password}
                    </p>
                  )}
                </div>
                {/* Address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                    name="address"
                    onChange={handleChange}
                    value={formData.address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. 123 Main St"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.address}
                    </p>
                  )}
                </div>
                {/* City */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    City
                  </p>
                  <input
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. Los Angeles"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.city}
                    </p>
                  )}
                </div>
                {/* Country */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Country
                  </p>
                  <input
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. United States"
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.country}
                    </p>
                  )}
                </div>
                {/* Zip Code */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Zip Code
                  </p>
                  <input
                    name="zip"
                    onChange={handleChange}
                    value={formData.zip}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. 90001"
                  />
                  {errors.zip && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errors.zip}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-.5">
                    <input
                      onClick={() => setChecked(!checked)}
                      className="w-4 h-4 cursor-pointer"
                      type="checkbox"
                    />{" "}
                    &nbsp;
                    <label className="text-sm font-titleFont">
                      I agree to the{" "}
                      <span className="hover:text-blue-600 duration-300">
                        Terms & Conditions
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    if (checked) {
                      handleSignUp();
                    }
                    e.preventDefault();
                  }}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Sign Up
                </button>
                <p className="text-sm font-titleFont text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-semibold text-red-500 hover:text-blue-600 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;

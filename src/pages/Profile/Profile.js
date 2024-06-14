import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Link } from "react-router-dom";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Profile" />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">
            User Profile
          </span>
        </h1>
        <div className="max-w-[600px] text-base text-lightText mb-2">
          <p>
            <strong>First Name:</strong> {userInfo.name.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userInfo.name.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Email Verified:</strong>{" "}
            {userInfo.emailVerification ? "Yes" : "No"}
          </p>
          <p>
            <strong>Phone Number:</strong> {userInfo.phoneNo}
          </p>
          <p>
            <strong>Address:</strong> {userInfo.address}
          </p>
          <p>
            <strong>City:</strong> {userInfo.city}
          </p>
          <p>
            <strong>Country:</strong> {userInfo.country}
          </p>
          <p>
            <strong>Zip Code:</strong> {userInfo.zipCode}
          </p>
        </div>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;

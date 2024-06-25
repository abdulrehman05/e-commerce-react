import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Link } from "react-router-dom";
import { getMyProducts, updateUser } from "../../redux/actionReducers";
import Product from "../../components/home/Products/Product";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const myProducts = useSelector((state) => state.myProducts);
  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState({
    firstName: userInfo.name.firstName,
    lastName: userInfo.name.lastName,
    email: userInfo.email,
    phoneNo: userInfo.phoneNo,
    address: userInfo.address,
    city: userInfo.city,
    country: userInfo.country,
    zipCode: userInfo.zipCode,
  });
  const handleEdit = () => {
    setIsEditing(true);
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    try {
      setLoading(true);

      const formDataToSend = new FormData();
      Object.keys(editInfo).forEach((key) => {
        if (editInfo[key] && editInfo[key] !== "-") {
          formDataToSend.append(key, editInfo[key]);
        } else {
          if (key !== "imageUpload") {
            formDataToSend.append(key, "-");
          }
        }
      });

      await dispatch(updateUser(formDataToSend));
      setIsEditing(false);
      setLoading(false);
    } catch (error) {}
    // Perform save logic here, like dispatching an action to update the user info
  };

  useEffect(() => {
    handleCancel();
  }, [userInfo]);
  const handleCancel = () => {
    setEditInfo({
      firstName: userInfo.name.firstName,
      lastName: userInfo.name.lastName,
      email: userInfo.email,
      phoneNo: userInfo.phoneNo,
      address: userInfo.address,
      city: userInfo.city,
      country: userInfo.country,
      zipCode: userInfo.zipCode,
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditInfo((prevState) => ({
      ...prevState,
      imageUpload: file,
    }));
  };
  useEffect(() => {
    try {
      dispatch(getMyProducts());
    } catch (error) {}
  }, []);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Profile" />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">
            User Profile
          </span>
        </h1>
        <div className="flex flex-col gap-5 max-w-[600px] text-base text-lightText mb-2">
          <p>
            <strong>Profile Picture:</strong>{" "}
            {isEditing ? (
              <input
                name="imageUpload"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full h-8 text-base font-medium rounded-md border-gray-400 outline-none"
                type="file"
              />
            ) : (
              <img
                src={
                  userInfo.profileImageName === "dummy"
                    ? "/empty-profile.png"
                    : process.env.REACT_APP_BACKEND_IMAGE_LINK +
                      userInfo.profileImageName
                }
                height={120}
                style={{
                  height: "120px",
                  width: "120px",
                  objectFit: "cover",
                  borderRadius: "100%",
                }}
              ></img>
            )}
          </p>
          <p>
            <strong>First Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={editInfo.firstName}
                onChange={handleChange}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
            ) : (
              userInfo.name.firstName || "-"
            )}
          </p>
          <p>
            <strong>Last Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={editInfo.lastName}
                onChange={handleChange}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
            ) : (
              userInfo.name.lastName || "-"
            )}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {/* {isEditing ? (
              <input
                type="email"
                name="email"
                value={editInfo.email}
                onChange={handleChange}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
            ) : ( */}
            {userInfo.email}
            {/* // )} */}
          </p>
          {/* <p>
            <strong>Account Verified:</strong>{" "}
            {userInfo.emailVerification ? "Yes" : "No"}
          </p> */}
          <p>
            <strong>Phone Number:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phoneNo"
                value={editInfo.phoneNo}
                onChange={handleChange}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
            ) : (
              userInfo.phoneNo || "-"
            )}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editInfo.address}
                onChange={handleChange}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
            ) : (
              userInfo.address || "-"
            )}
          </p>
          <p>
            <strong>City:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={editInfo.city}
                onChange={handleChange}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
            ) : (
              userInfo.city || "-"
            )}
          </p>
          <p>
            <strong>Country:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={editInfo.country}
                onChange={handleChange}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
            ) : (
              userInfo.country || "-"
            )}
          </p>
          <p>
            <strong>Zip Code:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="zipCode"
                value={editInfo.zipCode}
                onChange={handleChange}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              />
            ) : (
              userInfo.zipCode || "-"
            )}
          </p>
        </div>
        {isEditing ? (
          <div>
            <button
              onClick={handleSave}
              className={
                "w-24 h-10 bg-primeColor text-white hover:bg-black duration-300 "
              }
              style={loading ? { background: "gray" } : {}}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="w-24 h-10 bg-red-500 text-white hover:bg-red-700 duration-300 ml-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="w-24 h-10 bg-primeColor text-white hover:bg-black duration-300"
          >
            Edit
          </button>
        )}
        {/* <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 ml-2">
            Continue Shopping
          </button>
        </Link> */}
      </div>
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">
            My Products
          </span>
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {myProducts?.products && myProducts?.products.length > 0 ? (
            myProducts?.products.map((e) => {
              return <Product product={e?.product} edit />;
            })
          ) : (
            <span>
              No products here. &nbsp;&nbsp;&nbsp;
              <Link
                to="/create-product"
                style={{ textDecoration: "underline" }}
              >
                Create a product
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

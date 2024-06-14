import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actionReducers";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    img: "",
    productName: "",
    price: "",
    color: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.img) newErrors.img = "Enter an image URL";
    if (!formData.productName) newErrors.productName = "Enter the product name";
    if (!formData.price) newErrors.price = "Enter the product price";
    if (!formData.color) newErrors.color = "Select a color";
    if (!formData.description) newErrors.description = "Enter a description";
    return newErrors;
  };

  const dispatch= useDispatch()
  const handlePost = async(e) => {
    try {
      
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(createProduct({...formData,image_url:formData.img,title:formData.productName}))
      setSuccessMsg(
        `Product ${formData.productName} has been created successfully.`
      );
    }
    } catch (error) {
      
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Create Product" />
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <form className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Create a Product
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">Image URL</p>
              <input
                name="img"
                onChange={handleChange}
                value={formData.img}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter image URL here"
              />
              {errors.img && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errors.img}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">Product Name</p>
              <input
                name="productName"
                onChange={handleChange}
                value={formData.productName}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter product name here"
              />
              {errors.productName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errors.productName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">Price</p>
              <input
                name="price"
                onChange={handleChange}
                value={formData.price}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="number"
                placeholder="Enter price here"
              />
              {errors.price && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errors.price}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">Color</p>
              <select
                name="color"
                onChange={handleChange}
                value={formData.color}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
              >
                <option value="">Select a color</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="black">Black</option>
              </select>
              {errors.color && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errors.color}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">Description</p>
              <textarea
                name="description"
                onChange={handleChange}
                value={formData.description}
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                placeholder="Enter description here"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errors.description}
                </p>
              )}
            </div>
            <button
              onClick={handlePost}
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Create Product
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;

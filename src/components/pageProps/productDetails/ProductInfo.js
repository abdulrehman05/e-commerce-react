import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, getCart } from "../../../redux/actionReducers";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();

  const addProductToCart = async () => {
    try {
      await dispatch(addToCart(productInfo?._id, 1));
      await dispatch(getCart());
    } catch (error) {}
  };
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.title}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.description}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <button
        onClick={() => addProductToCart()}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>
    </div>
  );
};

export default ProductInfo;

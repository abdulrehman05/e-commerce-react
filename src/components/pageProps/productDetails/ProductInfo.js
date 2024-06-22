import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchProducts,
  getCart,
  reviewProduct,
} from "../../../redux/actionReducers";
import { FaStar } from "react-icons/fa";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();

  const addProductToCart = async () => {
    try {
      await dispatch(addToCart(productInfo?._id, 1));
      await dispatch(getCart());
    } catch (error) {}
  };
  const [hoverReview, setHoverReview] = useState(undefined);

  const handleClick = async (value) => {
    try {
      await dispatch(reviewProduct(value, productInfo?._id));
      await dispatch(fetchProducts());
    } catch (error) {}
  };
  const { cartItems } = useSelector((state) => state.cart);

  let currentStock = productInfo?.stock;
  cartItems &&
    cartItems.length > 0 &&
    cartItems.map((e) => {
      if (e?.productId === productInfo?._id) {
        currentStock -= e?.quantity;
      }
    });
  const averageRating = productInfo?.averageRating || 0;
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo?.title}</h2>
      <p className="text-xl font-semibold">${productInfo?.price}</p>
      <p className="text-base text-gray-600">{productInfo?.description}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p
        className="font-medium text-lg"
        style={{ textTransform: "capitalize" }}
      >
        <span className="font-normal">Color:</span> {productInfo?.color}
      </p>
      {currentStock && currentStock > 0 ? (
        <button
          onClick={() => addProductToCart()}
          className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
        >
          Add to Cart
        </button>
      ) : (
        <button
          className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont cursor-normal"
          style={{ background: "gray" }}
        >
          Out of stock
        </button>
      )}
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Category:</span>{" "}
        {productInfo?.category}
      </p>

      <div className="flex items-center">
        {Array.from({ length: 5 }, (v, i) => {
          const rating = i + 1;
          let starColor = "gray";
          if (hoverReview && hoverReview >= rating) {
            starColor = "orange";
          } else if (!hoverReview && averageRating >= rating) {
            starColor = "orange";
          }

          // Calculate the fill percentage for the star based on the decimal part of the rating
          let fillPercentage = "0%";
          if (averageRating > rating - 1 && averageRating < rating) {
            fillPercentage = `${(averageRating - (rating - 1)) * 100}%`;
          } else if (averageRating >= rating) {
            fillPercentage = "100%";
          }
          return (
            <div
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <FaStar
                size={24}
                onClick={() => handleClick(rating)}
                onMouseOver={() => setHoverReview(rating)}
                onMouseOut={() => setHoverReview(undefined)}
                color={starColor}
                style={{ cursor: "pointer" }}
              />
              {(!hoverReview || (hoverReview && hoverReview > rating - 1)) && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: fillPercentage,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <FaStar
                    size={24}
                    color="orange"
                    onClick={() => handleClick(rating)}
                    onMouseOver={() => setHoverReview(rating)}
                    onMouseOut={() => setHoverReview(undefined)}
                    // style={{ transform: "translateX(-50%)" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="font-normal text-sm">
        <span className=""> Remaining Stock:</span> {currentStock || 0}
      </p>
    </div>
  );
};

export default ProductInfo;

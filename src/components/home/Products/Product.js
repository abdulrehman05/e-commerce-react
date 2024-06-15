import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import {
  MdDeleteOutline,
  MdModeEditOutline,
  MdOutlineLabelImportant,
} from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToCart,
  deleteProduct,
  fetchProducts,
  getCart,
  getMyProducts,
  reviewProduct,
} from "../../../redux/actionReducers";
import { CgMoreVertical } from "react-icons/cg";
import { FaStar } from "react-icons/fa";

const Popup = ({ isOpen, onClose, product, dispatch }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const onDelete = async () => {
    try {
      await dispatch(deleteProduct(product?._id));
      dispatch(fetchProducts());
      dispatch(getMyProducts());
      dispatch(getCart());
      onClose();
    } catch (error) {}
  };

  return (
    <div
      style={{ zIndex: "100000" }}
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">
          Are you sure you want to delete {product?.title}?
        </h2>
        <div
          className="flex flex-row"
          style={{ justifyContent: "space-between" }}
        >
          <button
            className="w-24 h-10 bg-black text-white hover:bg-black duration-300"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="w-24 h-10 bg-red-500 text-white hover: bg-red-700 duration-300"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Product = ({ product, edit }) => {
  const averageRating = product?.averageRating || 0;
  const dispatch = useDispatch();
  const _id = product?._id;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = product;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const addProductToCart = async () => {
    try {
      await dispatch(addToCart(product?._id, 1));
      await dispatch(getCart());
    } catch (error) {}
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(averageRating || 0);
  const [hoverReview, setHoverReview] = useState(undefined);

  const handleClick = async (value) => {
    try {
      await dispatch(reviewProduct(value, product?._id));
      await dispatch(fetchProducts());
    } catch (error) {}
  };
  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        {edit && (
          <div className="absolute cursor-pointer right-0 flex flex-row">
            <Link to={"/edit-product/" + product?._id}>
              <MdModeEditOutline onClick={() => {}} />
            </Link>
            <MdDeleteOutline onClick={() => setIsPopupOpen(true)} />
          </div>
        )}
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          product={product}
          dispatch={dispatch}
        />
        <div>
          <Image
            className="w-full h-full"
            imgSrc={
              process.env.REACT_APP_BACKEND_IMAGE_LINK + product?.ImageFileName
            }
          />
        </div>
        <div className="absolute top-6 left-8">
          {product?.badge && <Badge text="New" />}
        </div>
        <div className="w-full h-20 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li
              onClick={() => addProductToCart()}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {product?.title}
          </h2>
          <p className="text-[#767676] text-[14px]">${product?.price}</p>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{product?.category}</p>
        </div>
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
                {(!hoverReview ||
                  (hoverReview && hoverReview > rating - 1)) && (
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
      </div>
    </div>
  );
};

export default Product;

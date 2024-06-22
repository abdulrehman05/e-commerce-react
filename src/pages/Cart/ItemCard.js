import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";
import {
  addToCart,
  decreaseFromCart,
  getCart,
} from "../../redux/actionReducers";

const ItemCard = ({ product, item }) => {
  const dispatch = useDispatch();
  const addProductToCart = async () => {
    try {
      await dispatch(addToCart(product?._id, 1));
      await dispatch(getCart());
    } catch (error) {}
  };
  const decreaseOneFromCart = async () => {
    try {
      await dispatch(decreaseFromCart(product?._id, 1));
      await dispatch(getCart());
    } catch (error) {}
  };
  const deleteFromCart = async (productId) => {
    try {
      await dispatch(decreaseFromCart(productId, Number(item?.quantity)));
      await dispatch(getCart());
    } catch (error) {}
  };
  const { cartItems } = useSelector((state) => state.cart);

  let currentStock = product?.stock;
  cartItems &&
    cartItems.length > 0 &&
    cartItems.map((e) => {
      if (e?.productId === product?._id) {
        currentStock -= e?.quantity;
      }
    });
  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => dispatch(deleteFromCart(item?.productId))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img
          className="w-32 h-32"
          src={
            process.env.REACT_APP_BACKEND_IMAGE_LINK + product?.ImageFileName
          }
          alt="productImage"
        />
        <h1 className="font-titleFont font-semibold">{product?.title}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${product?.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => decreaseOneFromCart()}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item?.quantity}</p>
          {currentStock && currentStock > 0 ? (
            <span
              onClick={() => addProductToCart()}
              className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
            >
              +
            </span>
          ) : (
            "Only " + product?.stock + " in stock"
          )}
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>${item?.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

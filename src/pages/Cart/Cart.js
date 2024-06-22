import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import {
  checkoutCart,
  emptyAllFromCart,
  fetchProducts,
  getCart,
  getMyProducts,
} from "../../redux/actionReducers";

const Cart = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart.cartItems);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    cart &&
      cart.map((item) => {
        price += item.totalPrice;
        return price;
      });
    setTotalAmt(price);
  }, [cart]);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);
  const removeAllFromCart = async () => {
    try {
      await dispatch(emptyAllFromCart());
      await dispatch(getCart());
    } catch (error) {}
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const checkout = async () => {
    if (!loading) {
      try {
        setError("");
        setLoading(true);
        await dispatch(checkoutCart());
        await dispatch(getCart());
        dispatch(fetchProducts());
        dispatch(getMyProducts());
        setCheckedOut(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        setError(error.message);
      }
    }
  };
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {checkedOut ? (
        <>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md">
              <h1 className="font-titleFont text-xl font-bold uppercase">
                Your Order has been placed.
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Please Check Your Email for Payment Details.
              </p>
              <Link to="/shop">
                <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {cart && cart.length > 0 ? (
            <div className="pb-20">
              <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
                <h2 className="col-span-2">Product</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
                <h2>Sub Total</h2>
              </div>
              <div className="mt-5">
                {cart.map((item) => {
                  const product = products.find(
                    (e) => e?.product?._id === item?.productId
                  );

                  return (
                    <div key={product?.product._id}>
                      <ItemCard product={product?.product} item={item} />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => removeAllFromCart()}
                className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
              >
                Reset cart
              </button>

              <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
                <div className="flex items-center gap-4">
                  <input
                    className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                    type="text"
                    placeholder="Coupon Number"
                  />
                  <p className="text-sm mdl:text-base font-semibold">
                    Apply Coupon
                  </p>
                </div>
                <p className="text-lg font-semibold">Update Cart</p>
              </div>
              <div className="max-w-7xl gap-4 flex justify-end mt-4">
                <div className="w-96 flex flex-col gap-4">
                  <h1 className="text-2xl font-semibold text-right">
                    Cart totals
                  </h1>
                  <div>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                      Subtotal
                      <span className="font-semibold tracking-wide font-titleFont">
                        ${totalAmt}
                      </span>
                    </p>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                      Shipping Charge
                      <span className="font-semibold tracking-wide font-titleFont">
                        ${shippingCharge}
                      </span>
                    </p>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                      Total
                      <span className="font-bold tracking-wide text-lg font-titleFont">
                        ${totalAmt + shippingCharge}
                      </span>
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                      <span className="text-sm italic font-bold">!</span>
                      {error}
                    </p>
                  )}
                  <div className="flex justify-end">
                    {/* <Link to="/paymentgateway"> */}
                    <button
                      className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                      onClick={checkout}
                      style={loading ? { background: "gray" } : {}}
                    >
                      Checkout
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
            >
              <div>
                <img
                  className="w-80 rounded-lg p-4 mx-auto"
                  src={emptyCart}
                  alt="emptyCart"
                />
              </div>
              <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                <h1 className="font-titleFont text-xl font-bold uppercase">
                  Your Cart feels lonely.
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  Your Shopping cart lives to serve. Give it purpose - fill it
                  with books, electronics, videos, etc. and make it happy.
                </p>
                <Link to="/shop">
                  <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { addToCart, getCart } from "../../redux/actionReducers";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  // const [productInfo, setProductInfo] = useState([]);
  const { productId } = useParams();
  const { products } = useSelector((state) => state.product);
  const productInfo =
    (products &&
      products.length > 0 &&
      products.find((product) => product?.product?._id === productId)
        ?.product) ||
    {};
  useEffect(() => {
    // setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location]);

  const addProductToCart = async () => {
    try {
      await dispatch(addToCart(productInfo?._id, 1));
      await dispatch(getCart());
    } catch (error) {}
  };
  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs
            title=""
            prevLocation={
              (prevLocation &&
                prevLocation.replace(productInfo?._id, productInfo?.title)) ||
              prevLocation
            }
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <ProductsOnSale />
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full object-cover"
              style={{ aspectRatio: "1 / 1" }}
              src={
                process.env.REACT_APP_BACKEND_IMAGE_LINK +
                productInfo?.ImageFileName
              }
              // alt={              process.env.REACT_APP_BACKEND_IMAGE_LINK + productInfo?.ImageFileName}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

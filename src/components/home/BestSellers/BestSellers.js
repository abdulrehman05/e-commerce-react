import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";
import { useSelector } from "react-redux";

const BestSellers = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {products &&
          products.length > 0 &&
          [...products]
            .sort(() => Math.random() - 0.5)
            .map((item) => (
              <div key={item._id} className="px-2">
                <Product product={item?.product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default BestSellers;

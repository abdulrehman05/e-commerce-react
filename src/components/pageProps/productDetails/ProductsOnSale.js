import React from "react";
import { SplOfferData } from "../../../constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductsOnSale = () => {
  const { products } = useSelector((state) => state.product);
  const { productId } = useParams();
  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-col gap-2">
        {products &&
          products.length > 0 &&
          [...products, ...products, ...products, ...products, ...products]
            .filter((e) => e?.product?._id !== productId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((item, index) => (
              <div
                key={item?.product?._id + index}
                className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2"
              >
                <div>
                  <img
                    style={{
                      width: "100px",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                    src={
                      process.env.REACT_APP_BACKEND_IMAGE_LINK +
                      item?.product?.ImageFileName
                    }
                    alt={item?.product?.img}
                  />
                </div>
                <div className="flex flex-col gap-2 font-titleFont">
                  <p className="text-base font-medium">
                    {item?.product?.productName}
                  </p>
                  <p className="text-sm font-semibold">
                    ${item?.product?.price}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;

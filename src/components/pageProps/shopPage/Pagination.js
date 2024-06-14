import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems } from "../../../constants";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const items = paginationItems;
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product product={item?.product} />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;

  const [searchParams, setSearchParams] = useSearchParams();
  const categories = searchParams.get("categories")
    ? searchParams.get("categories").split(",")
    : [];
  // const colors = searchParams.get("colors")
  //   ? searchParams.get("colors").split(",")
  //   : [];
  // const brands = searchParams.get("brands")
  //   ? searchParams.get("brands").split(",")
  //   : [];
  const prices = searchParams.get("prices")
    ? searchParams.get("prices").split(",")
    : [];
  const { products } = useSelector((state) => state.product);
  const currentProducts = (products && products.length > 0 ? products : [])
    .filter((e) =>
      categories.length > 0 ? categories.includes(e?.product?.category) : true
    )
    .filter((e) =>
      prices.length > 0
        ? prices.some((price) => {
            const seperatedPrices = (price && price.split("-")) || [
              "100",
              "200",
            ];
            const price1 = seperatedPrices[0];
            const price2 = seperatedPrices[1];
            return (
              Number(e?.product?.price) >= Number(price1) &&
              (price2 ? Number(e?.product?.price) <= Number(price2) : true)
            );
          })
        : true
    );
  const currentItems = currentProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to{" "}
          {endOffset <= currentProducts?.length || 0
            ? endOffset
            : currentProducts?.length || 0}{" "}
          of {currentProducts.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;

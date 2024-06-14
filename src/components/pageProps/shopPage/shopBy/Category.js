import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useSelector } from "react-redux";

const Category = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  const categories = searchParams.get("categories")
    ? searchParams.get("categories").split(",")
    : [];
  const colors = searchParams.get("colors")
    ? searchParams.get("colors").split(",")
    : [];
  const brands = searchParams.get("brands")
    ? searchParams.get("brands").split(",")
    : [];
  const prices = searchParams.get("prices")
    ? searchParams.get("prices").split(",")
    : [];

  // }, [searchParams]);
  // const items = [
  //   {
  //     _id: 990,
  //     title: "New Arrivals",
  //     icons: true,
  //   },
  //   {
  //     _id: 991,
  //     title: "Gadgets",
  //   },
  //   {
  //     _id: 992,
  //     title: "Accessories",
  //     icons: true,
  //   },
  //   {
  //     _id: 993,
  //     title: "Electronics",
  //   },
  //   {
  //     _id: 994,
  //     title: "Others",
  //   },
  // ];

  const handleCategoryClick = (title) => {
    const currentCategories = searchParams.get("categories")
      ? searchParams.get("categories").split(",")
      : [];
    const categoryIndex = currentCategories.indexOf(title);
    if (categoryIndex >= 0) {
      // Category already selected, remove it
      currentCategories.splice(categoryIndex, 1);
    } else {
      // Category not selected, add it
      currentCategories.push(title);
    }
    if (currentCategories.length > 0) {
      searchParams.set("categories", currentCategories.join(","));
    } else {
      searchParams.delete("categories");
    }
    setSearchParams(searchParams);
    navigate(`?${searchParams.toString()}`);
  };

  const { products } = useSelector((state) => state.product);
  const categoriesProd = [
    ...new Set(
      (products &&
        products.length > 0 &&
        products
          .map((product) => product?.product?.category)
          .filter((category) => category !== undefined)) ||
        []
    ),
  ];
  const items = categoriesProd.map((e, index) => ({
    _id: e + index,
    title: e,
  }));
  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => (
            <li
              key={_id}
              className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer ${
                categories.includes(title) ? "font-bold" : ""
              }`}
              onClick={() => handleCategoryClick(title)}
            >
              {title}
              {/* {icons && (
                <span className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300">
                  <ImPlus />
                </span>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;

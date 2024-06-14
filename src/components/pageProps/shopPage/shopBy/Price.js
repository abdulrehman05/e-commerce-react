import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavTitle from "./NavTitle";

const Price = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const priceList = [
    {
      _id: 950,
      priceOne: 0.0,
      priceTwo: 49.99,
    },
    {
      _id: 951,
      priceOne: 50.0,
      priceTwo: 99.99,
    },
    {
      _id: 952,
      priceOne: 100.0,
      priceTwo: 199.99,
    },
    {
      _id: 953,
      priceOne: 200.0,
      priceTwo: 399.99,
    },
    {
      _id: 954,
      priceOne: 400.0,
      priceTwo: 599.99,
    },
    {
      _id: 955,
      priceOne: 600.0,
      priceTwo: 1000.0,
    },
  ];

  const handlePriceClick = (priceOne, priceTwo) => {
    const range = `${priceOne.toFixed(2)}-${priceTwo.toFixed(2)}`;
    const currentPrices = searchParams.get("prices")
      ? searchParams.get("prices").split(",")
      : [];
    const priceIndex = currentPrices.indexOf(range);
    if (priceIndex >= 0) {
      // Price range already selected, remove it
      currentPrices.splice(priceIndex, 1);
    } else {
      // Price range not selected, add it
      currentPrices.push(range);
    }
    if (currentPrices.length > 0) {
      searchParams.set("prices", currentPrices.join(","));
    } else {
      searchParams.delete("prices");
    }
    setSearchParams(searchParams);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              onClick={() => handlePriceClick(item.priceOne, item.priceTwo)}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;

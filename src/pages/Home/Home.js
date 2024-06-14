import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import { useSelector } from "react-redux";

const Home = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Sale />
        {products && products.length > 5 && <NewArrivals />}
        {products && products.length > 0 && <BestSellers />}
        <YearProduct />
        {products && products.length > 0 && <SpecialOffers />}
      </div>
    </div>
  );
};

export default Home;

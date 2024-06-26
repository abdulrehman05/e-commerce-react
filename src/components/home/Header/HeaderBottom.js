import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import { LOGOUT, logout } from "../../../redux/store";

const HeaderBottom = () => {
  const cart = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  // useEffect(() => {
  //   document.body.addEventListener("click", (e) => {
  //     if (ref.current.contains(e.target)) {
  //       setShow(true);
  //     } else {
  //       setShow(false);
  //     }
  //   });
  // }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    const filtered =
      (products &&
        products.length > 0 &&
        [...products].filter((item) =>
          item?.product?.title.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
      [];
    setFilteredProducts(filtered);
  }, [searchQuery]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
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
    if (currentCategories && currentCategories?.length > 0) {
      searchParams.set("categories", currentCategories.join(","));
    } else {
      searchParams.delete("categories");
    }
    setSearchParams(searchParams);
    navigate(`/shop?${searchParams.toString()}`);
  };
  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: -50, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                <li
                  onClick={() => {
                    handleCategoryClick("Art");
                  }}
                  className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                >
                  Art
                </li>
                <li
                  onClick={() => {
                    handleCategoryClick("Craft");
                  }}
                  className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                >
                  Craft
                </li>
              </motion.ul>
            )}
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProducts.map((item) => (
                    <div
                      onClick={() =>
                        navigate(
                          `/product/${item?.product?._id
                            .toLowerCase()
                            .split(" ")
                            .join("")}`,
                          {
                            state: {
                              item: item?.product,
                            },
                          }
                        ) &
                        setShowSearchBar(true) &
                        setSearchQuery("")
                      }
                      key={item?.product?._id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                    >
                      <img
                        className="w-24"
                        src={
                          process.env.REACT_APP_BACKEND_IMAGE_LINK +
                          item?.product?.ImageFileName
                        }
                        alt="productImg"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">
                          {item?.product?.title}
                        </p>
                        <p className="text-xs">{item.description}</p>
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            ${item?.product?.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                {!userInfo && (
                  <Link to="/signin">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Login
                    </li>
                  </Link>
                )}
                {!userInfo && (
                  <Link to="/signup">
                    <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                      Sign Up
                    </li>
                  </Link>
                )}
                {/* <Link onClick={() => setShowUser(false)} to="/signup">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Sign Up
                  </li>
                </Link> */}
                {userInfo && (
                  <>
                    <Link to="/profile">
                      <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                        Profile
                      </li>
                    </Link>
                    {/* <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Others
                </li> */}
                    <li
                      onClick={() => {
                        dispatch(logout());
                        navigate("/signin");
                      }}
                      className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer"
                    >
                      Log out
                    </li>
                  </>
                )}
              </motion.ul>
            )}
            {userInfo && (
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingCart />
                  <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                    {cart?.cartItems && cart?.cartItems.length > 0
                      ? cart?.cartItems.length
                      : 0}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;

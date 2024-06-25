import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import CreateProduct from "./pages/ProductAdd/ProductAdd";
import { useEffect } from "react";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./pages/Account/ForgotPassword";
import ResetPassword from "./pages/Account/ResetPassword";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const PrivateRoute = ({ element }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  return userInfo && userInfo.email && userInfo.token ? (
    element
  ) : (
    <Navigate to="/signin" />
  );
  // return element
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          // <PrivateRoute
          //  element={
          <Layout />
          // }
          // />
        }
      >
        {/* ==================== Header Navlink Start here =================== */}
        <Route
          index
          element={
            // <PrivateRoute element={
            <Home />
            // }
            // />
          }
        ></Route>
        <Route
          path="/shop"
          element={
            // <PrivateRoute
            // element={
            <Shop />
            // }
            //   />
          }
        ></Route>
        <Route
          path="/about"
          element={
            // <PrivateRoute
            // element={
            <About />
            // }
            //   />
          }
        ></Route>
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        ></Route>
        {/* <Route
          path="/contact"
          element={<PrivateRoute element={<Contact />} />}
        ></Route> */}
        <Route
          path="/create-product"
          element={<PrivateRoute element={<CreateProduct />} />}
        ></Route>
        <Route
          path="/edit-product/:productId"
          element={<PrivateRoute element={<CreateProduct edit />} />}
        ></Route>
        {/* <Route
          path="/journal"
          element={<PrivateRoute element={<Journal />} />}
        ></Route> */}
        {/* ==================== Header Navlink End here ===================== */}
        {/* <Route
          path="/offer"
          element={<PrivateRoute element={<Offer />} />}
        ></Route> */}
        <Route
          path="/product/:productId"
          element={
            // <PrivateRoute
            // element={
            <ProductDetails />
            // }
            //   />
          }
        ></Route>
        <Route
          path="/cart"
          element={<PrivateRoute element={<Cart />} />}
        ></Route>
        {/* <Route
          path="/paymentgateway"
          element={<PrivateRoute element={<Payment />} />}
        ></Route> */}
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/forget-password" element={<ForgotPassword />}></Route>
      <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

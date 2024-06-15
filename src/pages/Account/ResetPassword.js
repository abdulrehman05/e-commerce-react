import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actionReducers";
import { logoLight } from "../../assets/images";
import { BsCheckCircleFill } from "react-icons/bs";

const ResetPassword = () => {
  const { token } = useParams();
  const router = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8 || confirmPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await dispatch(resetPassword({ password }, token));
      setSuccess("Password reset successfully");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        router("/signin");
      }, 3000); // Redirect to signin page after 3 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  const userInfo = useSelector((state) => state?.user?.userInfo);
  useEffect(() => {
    if (userInfo && userInfo.email && userInfo.token) {
      router("/");
    }
  }, [userInfo]);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with Market Wizard
              </span>
              <br />
              SignUp and make your First Order now & get big discount of your
              first Three Oders.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all Market Wizard services
              </span>
              <br />
              SignUp and get Access to your account.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Millions of Customers Trusted on our Market Wizard Platform.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © Market Wizard
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      {success ? (
        <>
          {" "}
          <p className="text-green-500 w-full flex-col h-screen flex items-center justify-center">
            {success}
          </p>
        </>
      ) : (
        <div className="w-full flex-col h-screen flex items-center justify-center">
          <form className="w-full max-w-md bg-white  rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  New Password
                </p>
                <input
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Confirm Password
                </p>
                <input
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSubmit}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiPlasticDuck } from "react-icons/gi";
import { loginUser } from "../redux/apiCalls/userCalls.js";
import { setLoginRedirect } from "../redux/auxiliarySlice.js";
import {loginOwner} from "../redux/apiCalls/ownerCalls.js";

const OwnerLoginPage = () => {
  const loginRedirect = useSelector((state) => state.auxiliary.loginRedirect);
  let owner = useSelector((state) => state.owner.owner);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (owner) {
      navigate(loginRedirect ? loginRedirect : "/owner/checkin", { replace: true });
      dispatch(setLoginRedirect(null));
    }
  }, [owner]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      loginField: formData.username,
      password: formData.password,
    };
    await loginOwner(dispatch, data);
  };

  return (
      <section className="sign-in-form section-padding w-[100vw] ">
        <section className="bg-white ">
          <div className="lg:grid lg:min-h-screen bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] lg:grid-cols-12">
            <section className="relative flex h-32 items-end  lg:col-span-5 border-r-2 border-dotted lg:h-full xl:col-span-6">
              <img
                  alt=""
                  src="https://images.pexels.com/photos/8436595/pexels-photo-8436595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="absolute inset-0 h-full w-full object-cover opacity0"
              />

              <div className="hidden lg:relative lg:block lg:p-12">
                <a className="block text-white" href="#">
                  <span className="sr-only">Home</span>
                  <GiPlasticDuck size={40} />
                </a>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Welcome to Duckling Fit
                </h2>
              </div>
            </section>

            <main className="flex items-center justify-center px-5 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
              <div className=" w-3/4">
                <div className="relative -mt-16 block lg:hidden">
                  <a
                      className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  >
                    <span className="sr-only">Home</span>
                    <GiPlasticDuck size={40} />
                  </a>

                  <h2 className="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                    Welcome back&nbsp;🐥
                  </h2>
                </div>
                <section className="  p-10 flex flex-wrap items-center justify-evenly">
                  <div className="mt-2 mt-lg-auto">
                    <h1
                        className="custom-link mb-2 text-6xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi"
                    >
                      Sign in
                      <i className="bi-arrow-right ms-2"></i>
                    </h1>
                  </div>
                </section>

              <span className="flex items-center">
                <span className="h-px flex-1 bg-black"></span>
                <span className="shrink-0 px-2"></span>
                <span className="h-px flex-1 bg-black"></span>
              </span>

              <form
                onSubmit={handleSubmit}
                className="mx-auto mb-0 w-[100%] mt-4 space-y-4"
              >
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg bg-base-200 border-gray-300 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter email/ phone number"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      ></svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type="password"
                      className="w-full rounded-lg border-1 bg-base-200 border-gray-300 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      ></svg>
                    </span>
                  </div>
                </div>

                <div className=" flex flex-wrap justify-between">

                  <Link to="/owner/forgotPassword" className="text-blue-400 font-medium text-sm cursor-pointer hover:underline">
                    Forgot password?
                  </Link>

                  <p className="text-sm text-gray-500">
                    Don’t have an account ? &nbsp;
                    <Link to="/owner/signup">Sign up</Link>
                  </p>

                  <button
                      type="submit"
                      className="block mt-3 w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </section>
  );
};

export default OwnerLoginPage;

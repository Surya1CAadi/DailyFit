import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiPlasticDuck } from "react-icons/gi";
import { loginUser } from "../redux/apiCalls/userCalls.js";
import { setLoginRedirect } from "../redux/auxiliarySlice.js";

const Login = () => {
  const loginRedirect = useSelector((state) => state.auxiliary.loginRedirect);
  let user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate(loginRedirect ? loginRedirect : "/", { replace: true });
      dispatch(setLoginRedirect(null));
    }
  }, [user]);

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
    await loginUser(dispatch, data);
  };

  return (
    <section className="sign-in-form section-padding w-[100vw] ">
      <section className="bg-white ">
        <div className="lg:grid lg:min-h-screen bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] lg:grid-cols-12">
          <section className="relative flex h-32 items-end  lg:col-span-5 border-r-2 border-dotted lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.pexels.com/photos/3763123/pexels-photo-3763123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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

          <main className="flex items-center w-full justify-center px-5 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="w-full">
              <div className="relative -mt-16 block lg:hidden">
                <a className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20">
                  <span className="sr-only">Home</span>
                  <GiPlasticDuck size={40} />
                </a>

                <h2 className="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                  Welcome back&nbsp;🐥
                </h2>
              </div>
              <section className="  p-10 flex flex-wrap items-center justify-evenly">
                <div className="mt-2 mt-lg-auto">
                  <h1 className="custom-link mb-2 text-6xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">
                    Sign in
                    <i className="bi-arrow-right ms-2"></i>
                  </h1>
                </div>
              </section>
              <section className="hidden flex flex-wrap items-center justify-evenly">
                <button
                  type="button"
                  className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign in with Google
                </button>
                <button
                  type="button"
                  className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                >
                  <svg
                    className="w-5 h-5 me-2 -ms-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="apple"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                  Sign in with Apple
                </button>
              </section>
              <span className="flex items-center">
                <span className="h-px flex-1 bg-black"></span>
                <span className="shrink-0 px-2"></span>
                <span className="h-px flex-1 bg-black"></span>
              </span>

              <form
                onSubmit={handleSubmit}
                className="mx-auto mb-0 mt-8 max-w-md space-y-4"
              >
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      required={true}
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
                      required={true}
                      onCopy={(e)=>e.preventDefault()}
                      onPaste={(e)=>e.preventDefault()}
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

                  <Link to="/forgotPassword" className="text-blue-400 font-medium text-sm cursor-pointer hover:underline">
                    Forgot password?
                  </Link>

                  <p className="text-sm text-gray-500">
                    Don’t have an account ? &nbsp;
                    <Link to="../signup">Sign up</Link>
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

export default Login;

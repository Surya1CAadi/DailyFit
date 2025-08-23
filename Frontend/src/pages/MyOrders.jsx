import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MyOrders = () => {

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    protect(navigate,user);
  }, [user]);


  return (
    <div className="py-14 bg-base-200 px-4 w-[100vw] md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <section className="  p-10 flex flex-wrap items-center justify-evenly">
          <div className="mt-2 mt-lg-auto">
            <h1
              href="#"
              className="custom-link mb-2 text-6xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi"
            >
              <i className="bi-arrow-right ms-2"></i>
            </h1>
          </div>
        </section>{" "}
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full  space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start border-dotted border-2 border-gray-300 rounded-xl px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold  leading-6 xl:leading-5 text-gray-800">
              hihihi
            </p>
            <div className="mt-4 md:mt-6 flex   flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <img
                  className="w-full hidden md:block"
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/25/49/e2/getlstd-property-photo.jpg?w=2400&h=-1&s=1"
                  alt="dress"
                />
                <img
                  className="w-full md:hidden"
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/25/49/e2/getlstd-property-photo.jpg?w=2400&h=-1&s=1"
                  alt="dress"
                />
              </div>
              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl xl:text-2xl  font-semibold leading-6 text-gray-800">
                    Gold Gym
                  </h3>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base xl:text-lg leading-6">
                    ₹ 250{" "}
                    <span className="text-red-300 line-through"> ₹ 300</span>
                  </p>

                  <div className="flex justify-start items-start flex-col space-y-2">
                    <a
                      className="group relative inline-block text-sm font-medium text-slate-500 focus:outline-none   active:text-slate"
                      href="#"
                    >
                      <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-slate-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                      <span className="relative block border border-current bg-base-200 px-8 py-3">
                        <NavLink to="/ordersdetail">View Order Details</NavLink>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
              <div className="w-full md:w-40">
                <img
                  className="w-full hidden md:block"
                  src="https://aartisto.com/wp-content/uploads/2023/04/Best-Gyms-930x620.jpg"
                  alt="dress"
                />
                <img
                  className="w-full md:hidden"
                  src="https://aartisto.com/wp-content/uploads/2023/04/Best-Gyms-930x620.jpg"
                  alt="dress"
                />
              </div>
              <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                    The Fitness Bar
                  </h3>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base xl:text-lg leading-6">
                    ₹ 200{" "}
                    <span className="text-red-300 line-through"> ₹ 250</span>
                  </p>

                  <div className="flex justify-start items-start flex-col space-y-2">
                    <a
                      className="group relative inline-block text-sm font-medium text-slate-500 focus:outline-none   active:text-slate"
                      href="#"
                    >
                      <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-slate-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                      <span className="relative block border border-current bg-base-200 px-8 py-3">
                        {" "}
                        View Order Details{" "}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

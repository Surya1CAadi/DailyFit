import React from "react";
import { GiPlasticDuck } from "react-icons/gi";

const GymSignup = () => {
  return (
    <section className=" bg-base-100 w-[100vw] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="">
        <div className="">
          <section className="bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
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
                <div className="max-w-xl lg:max-w-3xl">
                  <div className="relative -mt-16 block lg:hidden">
                    <a
                      className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                      href="#"
                    >
                      <span className="sr-only">Home</span>
                      <GiPlasticDuck size={40} />
                    </a>

                    <h2 className="mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl">
                      Welcome to Duckling Fit &nbsp;🐥
                    </h2>
                  </div>
                  <section className=" -mt-0 p-10 flex flex-wrap items-center justify-evenly">
                    <div className="mt-2 mt-lg-auto">
                      <h1 className="custom-link mb-2 text-6xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">
                        Sign up
                        <i className="bi-arrow-right ms-2"></i>
                      </h1>
                    </div>
                  </section>
                  <section className=" flex flex-wrap items-center justify-evenly">
                    <a href="https://forms.gle/U19SbBsN5RidDcdK7">
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
                        Sign up with Google form
                      </button>
                    </a>
                  </section>
                  <span className="flex items-center"></span>
                </div>
              </main>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default GymSignup;

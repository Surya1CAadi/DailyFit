import React from "react";
import {Link, useNavigate, useRouteError} from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import to from "await-to-js";
import { request } from "../requestMethods.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearAll as clearAllOwner } from "../redux/ownerSlice.js";
import { clearAll as clearAllUser } from "../redux/userSlice.js";
import {clearAll as clearAllAuxiliary} from "../redux/auxiliarySlice.js";

const ErrorPage = () => {
  const error = useRouteError();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClearSiteData = async () => {
    const [err, res] = await to(request.post("/clearSiteData"));
    if (err) {
      toast("Something went wrong, please try again!", { type: "error" });
      return;
    }

    // dispatch(clearAllOwner());
    dispatch(clearAllUser());
    dispatch(clearAllAuxiliary());

    navigate("/login");

  };

  return (
    <div className="p-10 bg-white mx-auto grid place-items-center text-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="flex flex-col justify-center items-center align-middle">
        {/*<FlagIcon className="w-20 h-20 mx-auto bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400"/>*/}
        <img
          className="w-32"
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYml0MGhyZzc0MnMxbDJ4YnV5eGk2ZTR4MzBvYXlibWp4ZGJyZ2x6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ePxvRzKyLW03hvFGXJ/giphy.webp"
          alt="quack quack"
        />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-8 !text-3xl !leading-snug md:!text-4xl"
        >
          <section className="  -p-4 flex flex-wrap items-center justify-evenly">
            <div className="mt-2 mt-lg-auto">
              <h1 className="custom-link mb-2 text-6xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">
                {(error && (error.statusText || error.message)) || "Opps!"}
                <i className="bi-arrow-right ms-2"></i>
              </h1>
            </div>
          </section>
          <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Please try refreshing the page or come back later. If problem exists
          please{" "}
          <span
            onClick={handleClearSiteData}
            className="cursor-pointer text-blue-400 hover:underline"
          >
            clear site data
          </span>{" "}
          and login again.
        </Typography>
        <Link
          to="/"
          class="group relative inline-block text-sm font-medium text-slate-500 focus:outline-none   active:text-slate"
        >
          <span class="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-slate-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span class="relative block border border-current bg-stone-800 text-white px-8 py-3">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

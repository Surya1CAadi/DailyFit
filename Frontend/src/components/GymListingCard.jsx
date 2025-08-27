import { Link } from "react-router-dom";
import React from "react";
import OpenDays from "./OpenDays.jsx";
import { FaFemale, FaMale } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";

function GymListingCard({ gym }) {
  // console.log(gym);
  return (
    <li key={gym._id} className="">
      <Link to={`/gymInfo/${gym._id}`}>
        <div className="relative group block overflow-hidden rounded-md hover:before:absolute hover:before:bg-[rgba(0,0,0,.2)] hover:before:w-full hover:before:h-full before:z-10">
          <img
            src={gym.displayImage}
            alt="Gym display image"
            className="h-[250px] w-full object-cover object-top transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />


          <div className="flex w-full z-20 justify-between align-middle items-center  bg-gradient-to-t to-[rgba(0,0,0,0.5)] from-transparent  absolute top-0 p-4 text-xl  text-white font-medium group-hover:underline group-hover:underline-offset-4">
            <div>{gym.name}</div>
            <span className="min-w-max bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
                ₹ {gym.rate}
              </span>
          </div>

          <div className="gap-3 absolute bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent p-5 bottom-0 w-full shadow-sm z-10 ">
            <div className="flex justify-between align-middle items-center">
              <div>
                {/*<h3 className="text-sm text-white font-medium group-hover:underline group-hover:underline-offset-4">*/}
                {/*  {gym.name}*/}
                {/*</h3>*/}
                <p className="tooltip text-xs text-stone-200 text-ellipsis whitespace-nowrap overflow-hidden max-w-[210px]" data-tip={gym.address}>
                  {gym.address}
                </p>
              </div>

              {/*<span className="min-w-max bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">*/}
              {/*  ₹ {gym.rate}*/}
              {/*</span>*/}
            </div>
            <div className="flex justify-between items-center align-middle">
              <OpenDays openDays={gym.openDays} />
              <div
                className={`text-white w-[20px] h-[20px] inline-flex flex-col mt-2 mr-2 align-middle justify-center items-center rounded-full text-[10px] 
                ${gym.sex === "M" ? "bg-blue-800" : gym.sex === "F" ? "bg-pink-500" : "bg-purple-500"}`}
              >
                {gym.sex === "M" ? (
                  // <FaMale size={16} />
                    "M"
                ) : gym.sex === "F" ? (
                  // <FaFemale size={16} />
                    "F"
                ) : (
                  // <BiMaleFemale size={16} />
                    "U"
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default GymListingCard;

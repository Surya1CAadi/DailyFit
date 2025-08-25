import React from "react";
import { convertTo12HourFormat } from "../helperFunctions/dateFunctions.js";
import { Link } from "react-router-dom";
import Badge from "./Badge.jsx";

function UserBooking({ booking }) {
  booking = {
    gym: "",
    address: "",
    date: "",
    rate: "",
    time: "",
    user: "",
    ...booking,
    image:
      "https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/Gym%20List%2FDelhi%20Gyms%2FThe%20Fitness%20Bar%2FDSC_2133.JPG?alt=media&token=183f946c-a921-4e51-ac72-21da5f1bb788",
  };

  return (
      <div className=" mb-2 bg-white p-4 rounded-xl w-[90%] md:w-4/5">
        <div className="flex flex-row justify-between flex-wrap items-center gap-5">
          <div className=" flex gap-2">
            <img
                className="object-cover w-[100px] rounded-sm mr-2"
                src={booking.image}
                alt="Gym image"
            />
            <div className="max-w-sm">
              <div className="text-xl mb-2">{booking.gym}</div>
              <div className="text-sm text-stone-400">{booking.address}</div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div>{new Date(booking.date).toDateString()}</div>
            <div>{convertTo12HourFormat(booking.time)}</div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-green-700 font-medium">₹{booking.rate}</div>
            <Badge status={booking.checkinStatus}/>
          </div>

          <div>
            <Link
                to={`/ordersdetail/${booking.id}`}
                className="btn btn-sm bg-blue-800 hover:bg-blue-900 text-white"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
  );
}

export default UserBooking;

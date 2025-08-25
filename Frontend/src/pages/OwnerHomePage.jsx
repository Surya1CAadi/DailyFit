import React, { useEffect, useState } from "react";
import { request } from "../requestMethods.js";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import OwnerCheckinTableEntry from "../components/OwnerCheckinTableEntry.jsx";
import { getIndianLocaleDate } from "../helperFunctions/dateFunctions.js";
import { useSelector } from "react-redux";
import { protect } from "../helperFunctions/protect.js";

export async function loadHomePageData() {
  try {
    const stats = await request.post("owner/getGymHomeStats");
    const bookings = await request.post("owner/getBookings", {
      date: getIndianLocaleDate(),
    });

    return {
      stats: stats.data.data,
      bookings: bookings.data.data.bookings,
    };
  } catch (e) {
    throw json(
      { message: e.response.data.message },
      { status: e.response.status },
    );
  }
}

const OwnerHomePage = () => {
  const owner = useSelector((state) => state.owner.owner);
  const navigate = useNavigate();
  const data = useLoaderData();

  useEffect(() => {
    protect(navigate, owner, "/owner/login");
  }, [owner]);

  const bookingsAll = data.bookings;
  const [stats, setStats] = useState(data.stats);
  const [bookings, setBookings] = useState([]);

  const sortBookings = () => {
    if (data.status === "fail") return [];
    const bkng = bookingsAll.filter(
      (booking) => booking.checkinStatus === "booked",
    );
    const checked = bookingsAll.filter(
      (booking) => booking.checkinStatus === "checked in",
    );
    const other = bookingsAll.filter(
      (booking) =>
        booking.checkinStatus !== "booked" &&
        booking.checkinStatus !== "checked in",
    );

    bkng.push(...checked, ...other);
    setBookings(bkng);
  };

  const updateFrontendStats = (booking) => {
    const newStats = { ...stats };
    newStats.todaysRevenue += booking.rate;
    newStats.checkedIn += 1;
    setStats(newStats);
  };

  useEffect(() => {
    sortBookings();
  }, []);

  return (
    <section className=" relative">
      {owner && (
        <div className="  relative ">
          <div className="bg-white shadow-sm border-b border-stone-400 grid grid-cols-1 w-[calc(100vw-0px)] md:grid-cols-2 md:fixed sm:relative top-[60px] left-0 z-10 ">
            <div className="p-4 md:pl-10 text-center">
              <h2 className="text-xl md:text-3xl font-bold leading-tight text-black">
                {/*<span className="font-extrabold text-gray-900  text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">*/}
                {/*  Duckling Fit*/}
                {/*</span>+*/}
                <span className="font-extrabold text-xl md:text-3xl text-gray-900 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-red-400 font-hihi">
                  {stats.name}
                </span>
              </h2>
              {/*<p className="leading-relaxed text-gray-600">(Since 2024)</p>*/}
            </div>
            <div className="*:text-center p-4 md:pr-10 text-sm md:text-xl">
              <div className="flex flex-row justify-center gap-5">
                <div className="self-end mr-5">{getIndianLocaleDate()}</div>
                <div className="flex items-center flex-col">
                  <h3 className="font-bold ">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                      {stats.todaysRevenue > 0
                        ? `₹ ${stats.todaysRevenue}`
                        : "_"}
                    </span>
                  </h3>
                  <p className="text-sm font-medium text-gray-900">
                    Today's Revenue
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <h3 className="font-bold ">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                      {" "}
                      {stats.checkedIn}/<span className="">{stats.total}</span>
                    </span>
                  </h3>
                  <p className="text-sm font-medium text-gray-900">
                    Today's Checkouts
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="overflow-scroll min-h-[500px] mt-28 mx-auto flex w-screen">
            <div className="sm:rounded-lg mx-auto">
              <table className="border rounded-3xl *:text-nowrap mx-auto overflow-scroll bg-white text-sm text-left text-gray-500 ">
                <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white ">
                  Checkin Stats
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Here you can checkin your customers. Please reload the page
                    if booking is not found. In case of any difficulty feel free
                    to contact us. Happy earning 😊️🏋️‍♂️
                  </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 relative">
                  <tr>
                    <th scope="col" className="w-0 absolute sr-only"></th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Timing
                    </th>
                    <th scope="col" className="px-6 py-3">
                      status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Enter Duck id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Checkin</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <OwnerCheckinTableEntry
                        sortBookings={sortBookings}
                        updateFrontendStats={updateFrontendStats}
                        key={booking.id}
                        booking={booking}
                      />
                    ))
                  ) : (
                    <div className="m-4">
                      --no booking yet, please reload after some time--
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};

export default OwnerHomePage;

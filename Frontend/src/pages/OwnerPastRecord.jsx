import React, { useEffect, useState } from "react";
import { request } from "../requestMethods.js";
import OwnerPastRecordTableEntry from "../components/OwnerPastRecordTableEntry.jsx";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import {
  convertTo_yyyy_mm_dd,
  convertToDMY,
  getIndianLocaleDate,
} from "../helperFunctions/dateFunctions.js";
import { useSelector } from "react-redux";
import { protect } from "../helperFunctions/protect.js";

export async function getBookings(queryDate) {
  try {
    if (typeof queryDate === "object")
      queryDate = getIndianLocaleDate(new Date());

    const bookings = await request.post("owner/getBookings", {
      date: queryDate,
    });

    return bookings.data.data.bookings;
  } catch (e) {
    throw json(
      {
        message: e.response.data.message,
      },
      { status: e.response.status },
    );
  }
}

const OwnerPastRecord = () => {
  const owner = useSelector((state) => state.owner.owner);
  const navigate = useNavigate();
  useEffect(() => {
    protect(navigate, owner, "/owner/login");
  }, [owner]);

  const [queryDate, setQueryDate] = useState(convertTo_yyyy_mm_dd(new Date()));
  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState(useLoaderData());
  const max = new Date();
  max.setDate(max.getDate() + 7);

  async function handleDateChange(e) {
    setLoading(true);
    setQueryDate(e.target.value);
    await setBookings(await getBookings(convertToDMY(e.target.value)));
    setLoading(false);
  }

  return (
    <div className="antialiased font-sans w-[100vw] bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {useLoaderData().status === "fail" ? (
        <>{useLoaderData().message}</>
      ) : (
        <div>
          {owner && (
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <section className=" p-1 flex flex-wrap items-center justify-evenly">
                  <div className="mt-2 mt-lg-auto">
                    <h1 className="custom-link mb-2 text-4xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">
                      Records
                    </h1>
                    <p className="text-center underline text-stone-500">
                      View your records
                    </p>
                  </div>
                </section>
                <div className="mb-4 relative flex flex-row w-full justify-between">
                  {/*<select className="  h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block   w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">*/}
                  {/*  <option>Yesterday</option>*/}
                  {/*  <option>Last week</option>*/}
                  {/*  <option>Last Month</option>*/}
                  {/*  <option>Last 3 Month</option>*/}
                  {/*  <option>Last 6 Month</option>*/}
                  {/*  <option>Last Year</option>*/}
                  {/*</select>*/}
                  <input
                    type="date"
                    onChange={handleDateChange}
                    value={queryDate}
                    max={max.toISOString().split("T")[0]}
                  />
                  <button
                    disabled={bookings.length === 0}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                  >
                    Download
                  </button>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="w-[95%] mx-auto leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 lowercase border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 tracking-wider">
                            Sr. no
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Rate
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <span className="p-4 loading loading-dots loading-sm"></span>
                        ) : bookings.length === 0 ? (
                          "--No booking for this day--"
                        ) : (
                          bookings.map((booking, i) => (
                            <OwnerPastRecordTableEntry
                              i={i + 1}
                              booking={booking}
                            />
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerPastRecord;

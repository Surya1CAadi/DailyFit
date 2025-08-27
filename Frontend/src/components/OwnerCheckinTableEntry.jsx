import React, { useState } from "react";
import { convertTo12HourFormat } from "../helperFunctions/dateFunctions.js";
import { request } from "../requestMethods.js";
import Badge from "./Badge.jsx";

function OwnerCheckinTableEntry({
  booking,
  sortBookings,
  updateFrontendStats,
}) {
  const [duckId, setDuckId] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [fulfilled, setFulfilled] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => setFulfilled(true), 1000);
  // }, []);

  async function handleCheckin() {
    setMessage("");
    setDisabled(true);
    try {
      const res = await request.post("owner/checkin", {
        bookingId: booking.id,
        duckId: duckId,
      });
      booking.checkinStatus = "checked in";
      if (res.status) {
        updateFrontendStats(booking);
        setFulfilled(true);
        setTimeout(() => {
          setFulfilled(false);
          sortBookings();
        }, 1000);
      }
    } catch (e) {
      // console.log(e);
      setMessage(e.response.data.message);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <tr
      className={`before:content-['Checked_in_Successfully_!'] before:absolute before:flex-col before:justify-center 
    before:align-middle before:items-center before:text-white before:rounded-sm before:transition-all 
    before:bg-green-500 before:h-full bg-white border-b relative *:h-16 
    ${fulfilled ? "before:flex before:w-full" : "before:block before:w-0"}`}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {booking.user}
      </th>
      <td className="px-6 py-4">{convertTo12HourFormat(booking.time)}</td>
      <td
        className={`px-6 ${booking.checkinStatus === "booked" ? "opacity-0" : "opacity-100"}`}
      >
        <Badge status={booking.checkinStatus} />
      </td>
      <td
        className={`px-6 relative ${booking.checkinStatus !== "booked" ? "hidden" : "visible"}`}
      >
        <input
          type="text"
          placeholder="Enter duck id here"
          value={duckId}
          onChange={(e) => setDuckId(e.target.value)}
          className="z-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
        />
        <span className="font-medium top-0 absolute text-red-700">
          {message}
        </span>
      </td>
      <td
        className={`px-6 py-4 text-right ${booking.checkinStatus !== "booked" ? "hidden" : "visible"}`}
      >
        <button
          onClick={handleCheckin}
          className="btn btn-sm bg-blue-800 hover:bg-blue-700 text-white"
          disabled={disabled}
        >
          Check in
        </button>
      </td>
    </tr>
  );
}

export default OwnerCheckinTableEntry;

import { convertTo12HourFormat } from "../helperFunctions/dateFunctions.js";
import Badge from "./Badge.jsx";

function OwnerPastRecordTableEntry({ booking, i }) {
  return (
    <tr>
      <td className="p-2 border-b border-gray-200 bg-white text-sm">{i}</td>
      <td className="p-2 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{booking.user}</p>
          </div>
        </div>
      </td>
      <td className="p-2 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(booking.date).toLocaleDateString()}
        </p>
      </td>
      <td className="p-2 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {convertTo12HourFormat(booking.time)}
        </p>
      </td>
      <td className="p-2 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">₹{booking.rate}</p>
      </td>
      <td className="p-2 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <Badge status={booking.checkinStatus} />
        </span>
      </td>
    </tr>
  );
}

export default OwnerPastRecordTableEntry;

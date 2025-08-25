import React from "react";

function Badge({ status, children }) {
  let colors = "bg-green-100 text-green-800";

  // console.log(status);

  switch (status) {
    case "booked":
      colors = "bg-yellow-100 text-yellow-800";
      break;
    case "refunded":
    case "canceled":
      colors = "bg-red-100 text-red-800";
      break;
  }

  // console.log(colors);

  return (
    <span
      className={` ${colors} text-xs font-medium me-2 px-2.5 py-0.5 rounded uppercase`}
    >
      {children? {...children} : status}
    </span>
  );
}

export default Badge;

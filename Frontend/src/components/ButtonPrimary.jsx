import React from "react";

function ButtonPrimary({ text, className, ...rest }) {
  return (
    // <button
    //   onClick={onClick}
    //   {...rest}
    //   className={`px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-400 text-white font-medium rounded-full transition-transform transform-gpu hover:-translate-y-[1px] hover:shadow-lg ${className}`}
    // >
    //   {text}
    // </button>
    //   <button className="py-2.5 px-6 rounded-lg text-sm font-medium text-black bg-yellow-300">Confirm</button>
      <button {...rest} className="btn hover:bg-yellow-200 border-none hover:scale-[105%] bg-yellow-300 text-black rounded-full">
        {text}
      </button>
  );
}

export default ButtonPrimary;

import React from "react";
import { useLottie } from "lottie-react";
import Animation4 from "../assets/my/Animation4.json";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ThankYou = () => {
  const formData = useSelector((state) => state.auxiliary.subscriptionFormData);

  const options = {
    animationData: Animation4,
    style: {
      margin: "auto",
      width: "300px",
    },
  };
  const { View } = useLottie(options);
  return (
    <div className="h-screen bg-base-100  mx-auto grid place-items-center text-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="bg-transparent h-screen">
        <div className="bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] md:mx-auto">
          <section className="p-4 flex flex-wrap items-center justify-evenly">
            <div className="mt-2 mt-lg-auto">
              <h1
                className="custom-link mb-2 text-4xl font-extrabold text-green-400  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi "
              >
                Payment Done!
                <i className="bi-arrow-right ms-2"></i>
              </h1>
              {/* <Lottie style={style} animationData={Animation1} />
               */}
              {View}
            </div>
          </section>{" "}
          
          <div className="text-center">
            <p className="text-gray-600 my-2 w-[90%]">
              Thank you for completing your secure online payment.
            </p>

            <p> Duck Id #{formData.duckId} </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
            <Link to={`/ordersdetail/${formData.bookingId}`} className="btn btn-info bg-cyan-300 text-black rounded-full">
              View in My orders
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

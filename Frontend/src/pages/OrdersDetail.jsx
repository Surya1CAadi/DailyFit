import React, { useEffect, useState } from "react";
import { request } from "../requestMethods.js";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import {
  convertTo12HourFormat,
  getIndianLocaleDate,
} from "../helperFunctions/dateFunctions.js";
import { useSelector } from "react-redux";
import { protect } from "../helperFunctions/protect.js";
import Badge from "../components/Badge.jsx";
import CancelOrderButton from "../components/CancelOrderButton.jsx";
import {IoOpenOutline} from "react-icons/io5";

export async function getOrderDetails({ params }) {
  const bookingId = params.orderId;
  let res;

  try {
    res = await request.post("/user/getOrderDetail", {
      bookingId,
    });
  } catch (e) {
    // console.log(e);
    return {
      status: "fail",
      message: e.response.data.message,
    };
  }

  return res.data;
}

const OrdersDetail = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    protect(navigate, user);
  }, [user]);

  const booking = useLoaderData();

  const data = booking?.data?.booking;

  const [status, setStatus] = useState(data.checkinStatus);

  return (
    <div className="py-14 bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] w-[100vw] px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      {booking.status === "fail" ? (
        <div>This order has a problem: {booking.message}</div>
      ) : (
        <div>
          <section className="p-4 flex flex-wrap text-center justify-center">
            <div className="mt-lg-auto">
              <h1 className="custom-link mb-2 text-6xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">
                Orders Detail
                <i className="bi-arrow-right ms-2"></i>
              </h1>
            </div>
          </section>
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Duck Id #{data.bill.duckId}
            </h1>
            <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
              Booked on: {getIndianLocaleDate(data.createdAt)}
            </p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  Gym Details
                </p>
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-center items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  <div className=" w-full md:w-40">
                    <img
                      className="w-full hidden md:block"
                      src={data.info.image}
                      alt="gym image"
                    />
                    <img
                      className="w-full md:hidden"
                      src={data.info.image}
                      alt="gym image"
                    />
                  </div>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full">
                    <div className="w-full flex flex-col justify-start items-start space-y-1">
                      <NavLink
                        to={`/gyminfo/${data.bill.gymId}`}
                        className="text-xl hover:text-black text-stone-400 xl:text-2xl font-semibold leading-6 flex gap-2 items-center"
                      >
                        <span className="text-gray-700">{data.info.gym}</span>
                        <IoOpenOutline size={18}/>
                      </NavLink>

                      <div
                        className="
                       flex w-full justify-between flex-wrap"
                      >
                        <div className="block w-fit">
                          <div className="flex min-w-40 flex-col space-y-2">
                            <div className="text-sm  text-gray-500">
                              Status: <Badge status={status} />
                            </div>
                            <p className="text-sm dark:text-white leading-none text-gray-500">
                              <span className="dark:text-gray-400 text-gray-600">
                                Slot Date:{" "}
                              </span>
                              {getIndianLocaleDate(data.info.date)}
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-500">
                              <span className="dark:text-gray-400 text-gray-600">
                                Slot Time:{" "}
                              </span>{" "}
                              {convertTo12HourFormat(data.info.time)}
                            </p>
                          </div>
                        </div>
                        {status === "booked" ? (
                          <div className=" inline-block w-fit mt-8">
                            <div className="group relative inline-block text-sm font-medium text-slate-500 focus:outline-none   active:text-slate">
                              <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-slate-500 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
                              <button
                                onClick={() =>
                                  document
                                    .getElementById("cancelModal")
                                    .showModal()
                                }
                                className="relative block border border-current bg-base-200 px-8 py-3"
                              >
                                Cancel
                              </button>

                              <dialog id="cancelModal" className="modal">
                                <div className="modal-box">
                                  <h3 className="font-bold text-lg mb-4">
                                    Are you sure you want to cancel your order ?
                                  </h3>

                                  <div className="flex flex-wrap flex-row w-full">
                                    <div className="md:w-1/2 mt-4 md:mr-8 mb-4">
                                      <img
                                        className="w-full hidden md:block"
                                        src={data.info.image}
                                        alt="gym image"
                                      />
                                      <img
                                        className="w-full md:hidden"
                                        src={data.info.image}
                                        alt="gym image"
                                      />
                                    </div>

                                    <div className=" flex items-center">
                                      <div className="block w-fit">
                                        <div className="flex min-w-40 flex-col space-y-2">
                                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                            {data.info.gym}
                                          </h3>
                                          <div className="text-sm  text-gray-500">
                                            Status: <Badge status={status} />
                                          </div>
                                          <p className="text-sm dark:text-white leading-none text-gray-500">
                                            <span className="dark:text-gray-400 text-gray-600">
                                              Slot Date:{" "}
                                            </span>
                                            {new Date(
                                              data.info.date,
                                            ).toLocaleDateString()}
                                          </p>
                                          <p className="text-sm dark:text-white leading-none text-gray-500">
                                            <span className="dark:text-gray-400 text-gray-600">
                                              Slot Time:{" "}
                                            </span>{" "}
                                            {convertTo12HourFormat(
                                              data.info.time,
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="modal-action">
                                    <form
                                      method="dialog"
                                      className="flex gap-3 items-center"
                                    >
                                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                      </button>

                                      <CancelOrderButton booking={booking} />

                                      <button className="btn btn-active btn-neutral">
                                        Close
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </dialog>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {status==='checked in'&& <div className="bg-black text-white p-1 px-3 rounded-xl shadow-sm shadow-yellow-400 mb-2 inline-block">Credit earned: ₹{data.credit || 0}</div>}
                            {status==='refunded' && <div className="font-medium">Refund RPN: {data.refId}</div>}
                            <div>{`This order has already been ${status}!`}</div>
                            <div>{`Date when ${status}: ${getIndianLocaleDate(data.updatedAt)}`}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                    Summary
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        ₹ {data.info.rate}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Discount{" "}
                        {/*<span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">*/}
                        {/*  FESTIVE*/}
                        {/*</span>*/}
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        ₹ 0
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Taxation
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        ₹ 0.00
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                      Total
                    </p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                      ₹ {data.info.rate}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                        Help Desk
                      </h3>
                    </div>
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/boy-services-support-icon.png"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                          Email Us
                          <br />
                          <span className="font-normal"></span>
                        </p>
                      </div>
                    </div>
                    <a
                      href="mailto:ceo@ducklingfit.com"
                      className="text-lg  leading-6 dark:text-white text-gray-800"
                    >
                      ceo@ducklingfit.com
                    </a>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                      Request a call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersDetail;

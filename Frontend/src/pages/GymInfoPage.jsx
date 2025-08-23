import React, {Fragment, useState} from "react";
import {motion} from "framer-motion";
import "flowbite";
import "react-datepicker/dist/react-datepicker.css";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {request} from "../requestMethods.js";
import {useLoaderData, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setGymData, setLoginRedirect, setSubscriptionFormData,} from "../redux/auxiliarySlice.js";

import {convertTo12HourFormat} from "../helperFunctions/dateFunctions";

export async function loadGymInfo({params}) {
    const id = params.gymId;
    return await request.post("/gym/getGymInfo", {id: id});
}

function formatDate(inputDate) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    const date = new Date(inputDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();

    return [day + "-" + months[monthIndex], weekdays[date.getDay()]];
}

const GymInfoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const gym = useLoaderData().data.data.gym;

    const [price, setPrice] = useState(gym.openDays[0].timings[0]?.rate || 0);
    const [open, setOpen] = useState(false);
    const [dateId, setDateId] = useState(gym.openDays[0].slotId);
    const [timeId, setTimeId] = useState("");

    const handleDateChange = (e) => {
        setDateId(e.target.value);
        setTimeId("");
    };

    const handleTimeChange = (e) => {
        setTimeId(e.target.value);
        setPrice(e.target.value.split(" ")[1]);
    };

    const handleBookNow = () => {
        if (timeId === "") {
            document.querySelector("#timeSelector").classList.add("outline-red-700");
            return;
        }
        document.querySelector("#timeSelector").classList.remove("outline-red-700");
        setOpen(true);
    };

    const handleProceedPaymentClick = async () => {
        const formData = {
            dateId: dateId, timeId: timeId.split(" ")[0], gymId: gym._id, status: "pay", duckId: "", bookingId: "",
        };

        const gymData = {
            name: gym.name, image: gym.images[0], sex: gym.sex, address: gym.address, date: document
                .querySelector("#dateSelector").selectedOptions[0].innerText, time: document
                .querySelector("#timeSelector").selectedOptions[0].innerText.split("(")[0], rate: document
                .querySelector("#timeSelector").selectedOptions[0].innerText.split("(")[1].replace(")", ""),
        };

        await dispatch(setSubscriptionFormData(formData));
        await dispatch(setGymData(gymData));
        await dispatch(setLoginRedirect("/pay"));

        navigate("/login");
    };

    return (<div
        className="bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]  dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center items-center gap-8 md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                        <img
                            className="w-full h-full object-cover rounded-lg"
                            src={gym.images[0]}
                            alt="GYM photo"
                        />
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    <div className="flex justify-between -mx-2 mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            {gym.name}
                        </h2>
                        <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                            <span className="text-green-700 font-bold dark:text-gray-300">
                  {" "}
                                ₹{price}
                </span>
                        </div>
                    </div>

                    <div className="badge bg-green-200 text-green-700 p-3 -translate-y-1/2">
                        {gym.sex === "M" ? "Male Only" : gym.sex === "F" ? "Female Only" : "Unisex"}
                    </div>

                    <a href={gym.addressLink} className="block underline text-gray-600 dark:text-gray-300 text-sm mb-4"
                       target="_blank">
                        {gym.address}
                    </a>

                    <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select date and time:
              </span>
                        <div className="flex -mx-2 mb-4 gap-3">
                            <select
                                id="dateSelector"
                                className="w-full rounded-md border bg-base-200 border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-white focus:ring-white"
                                value={dateId}
                                onChange={handleDateChange}
                            >
                                {gym.openDays.map((obj) => {
                                    const formatedDate = formatDate(obj.date);
                                    return (<option key={obj.slotId} value={obj.slotId}>
                                        {`${formatedDate[0]} (${formatedDate[1]})`}
                                    </option>);
                                })}
                            </select>
                            <select
                                id="timeSelector"
                                value={timeId}
                                onChange={handleTimeChange}
                                className=" w-full rounded-md border bg-base-200 border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-white focus:ring-white"
                            >
                                <option value="">--select time--</option>
                                {gym.openDays
                                    .find((obj) => obj.slotId === dateId)
                                    .timings.map((obj) => {
                                        return (<option key={obj._id} value={`${obj._id} ${obj.rate}`}>
                                            {`${convertTo12HourFormat(obj.start)} ‎‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ (₹${obj.rate})`}
                                        </option>);
                                    })}
                            </select>
                        </div>
                        <span className="block text-red-700 font-medium -mt-3 mb-3">
                *prices might change according to slots
              </span>
                    </div>
                    <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Now:
              </span>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <motion.button
                                    className="w-full bg-gray-300 my-6  dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                                    whileHover={{scale: 1.1}}
                                    transition={{
                                        layout: {
                                            duration: 1, type: "spring",
                                        },
                                    }}
                                    layout
                                    onClick={handleBookNow}
                                >
                                    Book now
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10 " onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
                        <div
                            className="flex min-h-full items-stretch  justify-center text-center md:items-center md:px-2 lg:px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel
                                    className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div
                                        className="relative flex w-full h-auto items-center overflow-hidden bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] sm:rounded-3xl px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                        <button
                                            type="button"
                                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>

                                        <div
                                            className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                            <div
                                                className="aspect-h-3 aspect-w-2  overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                                <img
                                                    src={gym.images[0]}
                                                    alt={gym.name}
                                                    className="object-cover object-center"
                                                />
                                            </div>
                                            <div className="sm:col-span-8 lg:col-span-7">
                                                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                                                    {gym.name}
                                                </h2>

                                                <section
                                                    aria-labelledby="information-heading"
                                                    className="mt-2"
                                                >
                                                    <p className="text-2xl text-gray-900">₹ {price}</p>
                                                </section>

                                                <section
                                                    aria-labelledby="options-heading"
                                                    className="mt-10"
                                                >
                                                    <div
                                                        className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-sm dark:text-white leading-none text-gray-500">
                                <span className="dark:text-gray-400 text-gray-600">
                                  Slot Date:{" "}
                                </span>{" "}
                                                            {document.querySelector(`[value="${dateId}"]`)?.textContent}
                                                        </p>
                                                        <p className="text-sm dark:text-white leading-none text-gray-500">
                                <span className="dark:text-gray-400 text-gray-600">
                                  Slot Time:{" "}
                                </span>{" "}
                                                            {document
                                                                .querySelector(`[value="${timeId}"]`)
                                                                ?.textContent.split(" ")[0]}
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={handleProceedPaymentClick}
                                                    >
                                                        Proceed to Payment page
                                                    </button>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div
                className="bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] border-dotted border-2 border-gray-200 rounded-2xl">
                <div
                    className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Gym Specifications
                        </h2>
                        <p className="mt-4 text-gray-500">{gym.info}</p>

                        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            {gym.specifications.map((feature) => (<div
                                key={feature._id}
                                className="border-t border-gray-200 pt-4"
                            >
                                <dt className="font-medium text-gray-900">
                                    {feature.title}
                                </dt>
                                <dd className="mt-2 text-sm text-gray-500">
                                    {feature.content}
                                </dd>
                            </div>))}
                        </dl>
                    </div>
                    <div
                        className="grid sm:grid-cols-2 grid-cols-1 w-full justify-items-center grid-rows-2 gap-4 md:gap-6">
                        {gym.images.map((img, i) => {
                            if (i === 0) return;
                            return (<img
                                key={i}
                                src={img}
                                alt={gym.name}
                                className="rounded-lg bg-gray-100 h-56 w-56 object-cover object-center"
                            />);
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default GymInfoPage;

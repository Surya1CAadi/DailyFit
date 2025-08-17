import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {json, useLoaderData, useNavigate} from "react-router-dom";
import {request} from "../requestMethods.js";
import UserBooking from "../components/UserBooking.jsx";
import {protect} from "../helperFunctions/protect.js";
import UpdatePasswordUser from "../components/UpdatePasswordUser.jsx";
import {AiTwotoneInfoCircle} from "react-icons/ai";
import ManageCredit from "../components/ManageCredit.jsx";

export async function loadBookings() {
    try {
        return await request.post("/user/getSubscriptions");
    } catch (e) {
        throw json({
            message: e.response.data.message,
        }, {status: e.response.status},);
    }
}

function ProfilePage() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        protect(navigate, user);
    }, [user]);

    const bookings = useLoaderData()?.data?.data?.subscriptions;

    return (<main className="min-h-screen py-1 text-sm border-dotted border-gray-300">
        {user && (<div className="p-2 md:p-4 w-full ">
            <div
                className="md:flex text-center mx-auto max-w-[1440px] flex-row flex-wrap justify-between items-center px-6 pb-8 mt-8  sm:rounded-lg">
                <div className="md:text-left flex flex-col items-center">
                    <h1 className="custom-link mb-2 text-4xl font-extrabold text-gray-900 lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">
                        {user?.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-lg">Credit: </span>
                        <span className="font-bold text-green-700">
                  ₹{useLoaderData()?.data?.data?.credit}
                </span>
                        <AiTwotoneInfoCircle className="relative bottom-1"/>

                        <div onClick={() => document.getElementById('manageCreditModel').showModal()}
                             className="text-blue-400 underline cursor-pointer">
                            Manage credit
                        </div>

                        <ManageCredit id="manageCreditModel"/>
                    </div>
                </div>
                <div className="text-center md:text-right text-stone-500">
                    <div className="email mb-2">{user?.email}</div>
                    <div className="email">{user?.phone}</div>

                    <div
                        onClick={() => document.getElementById("psModel").showModal()}
                        className="px-4 py-1 hover:scale-[102%] cursor-pointer hover:shadow-sm transition-all border text-sm rounded-md my-2 inline-block text-center text-black border-black"
                    >
                        Reset Password
                    </div>
                    <UpdatePasswordUser id="psModel"/>
                </div>
            </div>
            <div className="py-5 *:max-w-[1400px] bg-base-200 flex flex-col items-center w-screen">
                <div className=" mb-4 w-[90%] md:w-3/5">
                    <h4 className="underline font-hihi text-2xl">My Orders</h4>
                </div>
                {/*///My orders listing from here///*/}
                <div className="w-full flex flex-col items-center">
                    {bookings
                        .map((booking) => (<UserBooking key={booking.id} booking={booking}/>))
                        .reverse()}
                </div>
            </div>
        </div>)}
    </main>);
}

export default ProfilePage;

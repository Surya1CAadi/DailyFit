import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../requestMethods.js";
import { toast } from "react-toastify";
import {
  setLoginRedirect,
  setSubscriptionFormData,
} from "../redux/auxiliarySlice.js";
import { logoutUser } from "../redux/apiCalls/userCalls.js";
import { useNavigate } from "react-router-dom";
import { getIndianLocaleDate } from "../helperFunctions/dateFunctions.js";

function Pay({gym}) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.auxiliary.subscriptionFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const formDataOrig = useSelector(
      (state) => state.auxiliary.subscriptionFormData,
  );

  async function handlePayNow(e) {
    e.preventDefault();
    setLoading(true);
    let response;
    try {
      const r = await request.post("/user/getOrderId", {
        ...formData,
      });
      response = r.data;
    } catch (e) {
      // setErrorMessage(e.response.data.message);
      //in case of authentication error
      if (e.response.status === 401) {
        toast(e.response.data.message, { type: "error", autoClose: true });
        await logoutUser(dispatch);
        dispatch(setLoginRedirect("/pay"));
        setTimeout(() => navigate("/login", { replace: true }), 1000);
      }
      return;
    }

    let options = {
      key: import.meta.env.VITE_RAZ_KEY,
      amount: response.data.rate * 100,
      currency: "INR",
      name: "Duckling Fit",
      description: `Subscribing ${response.data.gym.name} for ${getIndianLocaleDate(response.data.requestedDate)}`,
      image: "https://www.ducklingfit.com/assets/logo-C3twdCVl.png",
      order_id: response.data.orderId,
      handler: async function (r) {
        setMessage("Payment done!");
        const res = await request.post("/user/validateSubscription", {
          userId: response.data.user.id,
          billId: response.data.billId,
          razSign: r.razorpay_signature,
          razOrderId: r.razorpay_order_id,
          razPaymentId: r.razorpay_payment_id,
        });
        const formData = { ...formDataOrig };
        formData.status = "complete";
        formData.duckId = res.data.data.duckId;
        formData.bookingId = res.data.data.bookingId;
        await dispatch(setSubscriptionFormData(formData));
      },
      prefill: {
        name: response.data.user.name,
        email: response.data.user.email,
        contact: `+91${response.data.user.contact}`,
      },
      notes: {
        userName: response.data.user.name,
        userContact: response.data.user.contact,
        userId: response.data.user.id,
        billId: response.data.billId, //this actually contains all info
      },
      // customer_id: `${response.data.user.id}`, //this is preventing from opening razorpay interface !!??
      remember_customer: true,
      timeout: 600,
      send_sms_hash: true,
      modal: {
        confirm_close: true,
        animation: true,
        ondismiss: function () {
          setMessage("Payment Cancelled! Please try again.");
          setLoading(false);
        },
      },
    };

    let rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      setMessage("Payment failed! Please try again later.");
      setLoading(false);
    });
    rzp.open();
  }

  return (
    <>
      {gym ? (
        <div>
          <div className="bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]  dark:bg-gray-800 pt-4 pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-stone-600 mb-6 text-xl underline">Subscription details</div>
              <div className="flex flex-col justify-center items-center gap-8 md:flex-row -mx-4">
                <div className="md:flex-1 px-4 hidden md:block">
                  <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={gym.image}
                      alt="GYM photo"
                    />
                  </div>
                </div>
                <div className="md:flex-1 px-4">
                  <div className="flex justify-between -mx-2 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {gym.name}
                    </h2>
                  </div>

                  <div className="badge bg-green-200 text-green-700 p-3 -translate-y-1/2">
                    {gym.sex === "M"
                      ? "Male Only"
                      : gym.sex === "F"
                        ? "Female Only"
                        : "Unisex"}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {gym.address}
                  </p>

                  <div>
                    <div className="mb-4 gap-3">
                      <div>
                        <span className="font-medium">Date: </span>
                        {gym.date}
                      </div>
                      <div>
                        <span className="font-medium">Time: </span>
                        {gym.time}
                      </div>
                      <div>
                        <span className="font-medium">Price: </span>
                        <span className="text-green-700 font-medium">
                          {gym.rate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ul className="list-disc ml-5">
                      <li>
                        Subscription can be cancelled until 1hour of allotted
                        time.
                      </li>
                      <li>
                        If slot is missed, 90% of the subscription charges will
                        be refunded.
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center mt-4 gap-2 text-sm">
                    <input
                      onClick={(e) => setDisabled(!e.target.checked)}
                      type="checkbox"
                      id="tnc"
                    />
                    <label htmlFor="tnc">
                      I agree to{" "}
                      <a className="text-blue-400 underline" target="_blank" href="https://privacyterms.io/view/DBqEtGlg-CAMLUMSD-9NpuZO/">
                        Privacy policies
                      </a>{" "}
                      and{" "}
                      <a className="text-blue-400 underline" target="_blank"  href="https://privacyterms.io/view/dDbASFAX-E9jHmf57-9Eeep9/">
                        Terms and conditions.
                      </a>
                    </label>
                  </div>

                  <div className="">
                    <div className="block py-4">{message}</div>
                    {loading && (
                      <div className="text-red-700 font-medium">
                        Do not close this page while payment is being processed!
                      </div>
                    )}
                    <div className="flex gap-3 items-center">
                      <button className="btn">Cancel</button>

                      <button
                        disabled={loading || disabled}
                        className="btn btn-primary"
                        onClick={handlePayNow}
                      >
                        Pay now!{" "}
                        <span
                          className={`loading loading-md loading-spinner ${loading ? "visible" : "hidden"}`}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>--please select a gym first--</>
      )}
    </>
  );
}

export default Pay;

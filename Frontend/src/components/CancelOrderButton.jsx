import { useState } from "react";
import { request } from "../requestMethods.js";

function CancelOrderButton({ booking }) {
  //also redirect to order details itself if the booking checckin status is not booked

  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCancel() {
    setDisable(true);

    let res;
    try {
      res = await request.post("/user/cancelOrder", {
        bookingId: booking.data.booking._id,
      });
      // console.log(res);
      setMessage(res.data.message);
    } catch (e) {
      setMessage(e.response.data.message);
    }
  }

  return (
    <div>
      {message ? (
        <div>{message}</div>
      ) : (
        <button
          disabled={disable}
          onClick={handleCancel}
          className="btn  flex items-center gap-3 disabled:bg-stone-600 transition-all active:scale-[99%]"
        >
          Cancel Order
          {disable && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </button>
      )}
    </div>
  );
}

export default CancelOrderButton;

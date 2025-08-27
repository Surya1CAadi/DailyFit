import {getIndianLocaleDate} from "../helperFunctions/dateFunctions.js";
import React, {useState} from "react";
import to from "await-to-js";
import {request} from "../requestMethods.js";

function PendingRedeems({inputName}) {

    const [pendingReq, setPendingReq] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    async function handlePendingPaymentInfo(e) {
        setLoading(true);
        const [err, res] = await to(request.post("/user/getPendingRedeems"));
        if (err) {
            setMessage(err.response.data.message);
        } else {
            setPendingReq(res.data.data.pendingReq);
        }

        setLoading(false);
    }

    return (<div className="collapse collapse-arrow bg-base-200">
        <input onClick={handlePendingPaymentInfo} className="bg-red-700 w-full opacity-100" type="radio"
               name={inputName}/>
        <div className="collapse-title text-xl font-medium">Pending redeems</div>
        <div className="collapse-content overflow-y-scroll">
            {pendingReq.length > 0 ? <table className="table table-xs">
                <thead>
                <tr>
                    <th>Credit</th>
                    <th>UPI</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {pendingReq.map((obj, i) => {
                    return <tr key={i}>
                        <td>{obj.credit}</td>
                        <td>{obj.upi}</td>
                        <td>{getIndianLocaleDate(obj.updatedAt)}</td>
                    </tr>;
                })}
                </tbody>
            </table> : <div>--you have no pending redeems--</div>}
            <span className="-top-3 text-red-700 font-medium">
                              {message}
                        </span>
            {loading && <span className="loading loading-spinner loading-xs"></span>}
        </div>
    </div>);
}

export default PendingRedeems;
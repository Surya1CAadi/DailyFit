import React, {useState} from "react";
import to from "await-to-js";
import {request} from "../requestMethods.js";
import {getIndianLocaleDate} from "../helperFunctions/dateFunctions.js";

function PreviousRedeems({inputName}) {

    const [previousRedeems, setPreviousRedeems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    async function handlePreviousRedeemsInfo() {
        setLoading(true);
        const [err, res] = await to(request.post("/user/getPreviousRedeems"));
        if (err) {
            setMessage(err.response.data.message);
        } else {
            setPreviousRedeems(res.data.data.previousReq.reverse());
        }

        setLoading(false);
    }

    return (<div className="collapse collapse-arrow bg-base-200">
        <input onClick={handlePreviousRedeemsInfo} className="bg-red-700 w-full opacity-100" type="radio"
               name={inputName}/>
        <div className="collapse-title text-xl font-medium">Previous redeems</div>
        <div className="collapse-content overflow-y-scroll">
            {previousRedeems.length > 0 ? <table className="table table-xs">
                <thead>
                <tr>
                    <th>Credit</th>
                    <th>UPI</th>
                    <th>RefId</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {previousRedeems.map((obj, i) => {
                    return <tr key={i}>
                        <td>{obj.credit}</td>
                        <td>{obj.upi}</td>
                        <td>{obj.refId}</td>
                        <td>{getIndianLocaleDate(obj.updatedAt)}</td>
                    </tr>;
                })}
                </tbody>
            </table> : <div>--you have no previous redeems--</div>}
            <span className="-top-3 text-red-700 font-medium">
                              {message}
                        </span>
            {loading && <span className="loading loading-spinner loading-xs"></span>}
        </div>
    </div>);
}

export default PreviousRedeems;
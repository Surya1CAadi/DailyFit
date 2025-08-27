import React, {useState} from "react";
import to from "await-to-js";
import {request} from "../requestMethods.js";

function RedeemForm({inputName}) {
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState("");
    const [fulfilled, setFulfilled] = useState(false);

    const [formData, setFormData] = useState({
        upi: "", upic: "", password: ""
    });

    function handleInputChange(e) {
        const newFormData = {...formData};
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }

    async function handleCreditRedeem(e) {
        e.preventDefault();
        setDisabled(true);

        if (formData.upi !== formData.upic) {
            setMessage("Upi id mismatches.")
            setDisabled(false);
        } else {
            const [err, res] = await to(request.post("/user/requestRedeem", {...formData}));

            if (err) {
                setMessage(err.response.data.message);
                setDisabled(false);
            } else {
                setFulfilled(true);
            }
        }
    }

    return (<div className="collapse collapse-arrow bg-base-200 overflow-y-scroll">
        <input className="bg-red-700 w-full opacity-100" type="radio" name={inputName} defaultChecked/>
        <div className="collapse-title text-xl font-medium">Redeem credits</div>
        <div className="collapse-content">
            <p className="text-black underline">You need to have at least 50 Credits to redeem.</p>

            <form onSubmit={handleCreditRedeem}>
                <div className="flex flex-col my-3 gap-1">
                    <label className="text-black m-0" htmlFor="upi1">Enter your UPI id</label>
                    <input required={true} name="upi" onChange={handleInputChange} value={formData.upi}
                           className="p-1 px-3 rounded-lg m-0" type="text"/>
                </div>
                <div className="flex flex-col my-3 gap-1">
                    <label className="text-black m-0" htmlFor="upi1">Re-enter your UPI id</label>
                    <input required={true} name="upic" onChange={handleInputChange} value={formData.upic}
                           className="p-1 px-3 rounded-lg m-0" type="text"/>
                </div>
                <div className="flex flex-col my-3 gap-1">
                    <label className="text-black m-0" htmlFor="upi1">Enter your password</label>
                    <input required={true} name="password" onChange={handleInputChange} value={formData.password}
                           className="p-1 px-3 rounded-lg m-0" type="text"/>
                </div>

                {fulfilled ? (<div className="text-green-800 font-bold bg-green-200 py-1 px-2 mt-4 rounded-full">
                    Request to redeem credit sent. We will redeem credits to provided upi id within 3 to
                    4 working days.
                </div>) : (<div className="relative">
                <span className="-top-3 text-red-700 font-medium">
                  {message}
                </span>

                    <button
                        disabled={disabled}
                        type="submit"
                        className="btn flex gap-4 w-full rounded-lg bg-black hover:shadow-lg mt-4 transition-all hover:bg-black text-white "
                    >
                        Request Redeem
                        {disabled && <span className="loading loading-spinner loading-xs"></span>}
                    </button>

                </div>)}

            </form>
        </div>
    </div>)
}

export default RedeemForm;
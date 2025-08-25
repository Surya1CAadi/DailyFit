import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signup1_2, signup2_2} from "../redux/apiCalls/userCalls.js";

const EmailVerification = ({setPhase, email, formData}) => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = await signup2_2(dispatch, email, otp);
        if (status === 1) setPhase("signup");
        else if (status === 2) setOtp("");
        else if (status === 3) navigate("/");
    };

    function handleOtpInsert(e) {
        let newOtp = e.target.value;
        newOtp = newOtp.replace(/\D/g, '');
        newOtp = newOtp.substring(0, 4);
        setOtp(newOtp)
    }

    const handleResendOtp = async (e) => {
        e.preventDefault();
        const status = await signup1_2(dispatch, formData, "Resending otp...",`Otp sent to ${formData.email}.`);
        if (status) setPhase("emailVerification");
    };

    return (<div>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-col text-sm gap-3 font-medium text-gray-400">
                            <p>We have sent a code to your email {email}</p>
                            <button
                                className="text-blue-400 underline"
                                onClick={() => setPhase("signup")}
                            >
                                Change Email
                            </button>
                        </div>
                    </div>

                    <div>
                        <form>
                            <div className="flex flex-col space-y-16">
                                <div
                                    className="flex flex-row items-center justify-between mx-auto w-full max-w-xs relative">
                                    <input type="text" value={otp} onChange={handleOtpInsert}
                                           className="opacity-0 z-5 absolute w-full h-full"/>

                                    <div className="w-16 h-16">
                                        <input
                                            disabled
                                            value={otp.charAt(0)}
                                            className={`w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ${otp.length == 0 ? "outline-blue-700" : "border-gray-200"}`}
                                            type="text"
                                            name="ch1"
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            disabled
                                            value={otp.charAt(1)}
                                            className={`w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ${otp.length == 1 ? "outline-blue-700" : "border-gray-200"}`}
                                            type="text"
                                            name="ch2"
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            disabled
                                            value={otp.charAt(2)}
                                            className={`w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ${otp.length == 2 ? "outline-blue-700" : "border-gray-200"}`}
                                            type="text"
                                            name="ch3"
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            disabled
                                            value={otp.charAt(3)}
                                            className={`w-full h-full flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 ${otp.length == 3 ? "outline-blue-700" : "border-gray-200"}`}
                                            type="text"
                                            name="ch4"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button onClick={handleSubmit} disabled={otp.length !== 4}
                                                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-blue-700 border-none text-white text-sm shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div
                                        className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive code?</p>{" "}
                                        <div
                                            className="cursor-pointer flex flex-row items-center text-blue-600"
                                            rel="noopener noreferrer"
                                            onClick={handleResendOtp}
                                        >
                                            Resend
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default EmailVerification;

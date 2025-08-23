import React, { useEffect, useState } from "react";
import to from "await-to-js";
import { request } from "../requestMethods.js";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

function ForgotPasswordUserReset() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [message, setMessage] = useState("");

  const { token } = useParams();

  const handleChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const [disabled, setDisabled] = useState(false);

  const [fulfilled, setFulfilled] = useState(false);

  async function handleReset(e) {
    e.preventDefault();
    if (fulfilled) return;

    setDisabled(true);

    const [err, res] = await to(
      request.patch(`/owner/forgotPassword/${token}`, formData),
    );

    if (err) {
      console.log(err);
      setMessage(err.response.data.message);
      setDisabled(false);
    } else {
      setFulfilled(true);
    }
  }

  useEffect(() => {
    console.log(token);
  }, []);

  return (
    <div className="relative flex flex-col bg-white h-[500px] justify-center align-middle items-center">
      <div
        onClick={() => navigate(-1)}
        className="px-6 py-2 hover:scale-105 hover:bg-stone-100 rounded-md transition-all cursor-pointer flex justify-between items-center gap-2 absolute top-0 left-0 translate-x-[50%] translate-y-[50%]"
      >
        <MdOutlineKeyboardBackspace size={18} />
      </div>
      <form
        onSubmit={handleReset}
        className="py-8 flex max-w-[400px] flex-col gap-4 px-6 "
      >
        <div className="mb-4">
          Enter the following fields to reset your password
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium -my-1" htmlFor="currentPassword">
            New Password
          </label>
          <input
            required
            type="text"
            name="password"
            value={formData.password}
            className="rounded-lg px-2 py-1"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium -my-1" htmlFor="currentPassword">
            Confirm New Password
          </label>
          <input
            type="text"
            required
            name="passwordConfirm"
            value={formData.passwordConfirm}
            className="rounded-lg px-2 py-1"
            onChange={handleChange}
          />
        </div>

        {fulfilled ? (
          <div className="text-green-800 font-bold bg-green-200 py-1 px-2 mt-4 rounded-full">
            Password reset Successful! You can login using your new password.
          </div>
        ) : (
          <div className="relative">
            <span className="-top-3 text-red-700 font-medium">{message}</span>
            <button
              disabled={disabled}
              type="submit"
              className="btn flex gap-4 w-full rounded-lg bg-black hover:shadow-lg mt-4 transition-all hover:bg-black text-white "
            >
              Reset
              {disabled && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ForgotPasswordUserReset;

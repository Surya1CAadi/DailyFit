import React, { useState } from "react";
import to from "await-to-js";
import { request } from "../requestMethods.js";

function UpdatePasswordUser({ id }) {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    passwordConfirm: "",
  });

  const [message, setMessage] = useState("");

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
      request.patch("/owner/updateMyPassword", formData),
    );

    if (err) {
      console.log(err);
      setMessage(err.response.data.message);
      setDisabled(false);
    } else {
      setFulfilled(true);
    }
  }

  return (
    <dialog id={id} className="modal text-left">
      <div className="modal-box w-full px-0">
        <form method="dialog">
          <button className="btn text-black btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <div className="flex flex-col bg-white text-black justify-center align-middle items-center">
          <form
            onSubmit={handleReset}
            className="py-8 flex w-[90%] flex-col text-black gap-4 px-6 "
          >
            <p>Enter the following fields to change your password</p>
            <div className="flex flex-col gap-2">
              <label className="font-medium -my-1" htmlFor="currentPassword">
                Current Password
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
                New Password
              </label>
              <input
                required
                type="text"
                name="newPassword"
                value={formData.newPassword}
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
                Password reset Successful!
              </div>
            ) : (
              <div className="relative">
                <span className="-top-3 text-red-700 font-medium">
                  {message}
                </span>
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
      </div>
    </dialog>
  );
}

export default UpdatePasswordUser;

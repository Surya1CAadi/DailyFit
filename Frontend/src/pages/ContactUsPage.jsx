import React, { useState } from "react";
import { request } from "../requestMethods.js";
import to from "await-to-js";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setMessage("Please input all fields!");
      return;
    }

    setDisabled(true);
    const [err, res] = await to(request.post("/contact", { ...formData }));
    console.log(err,res);
    if (err) {
      setMessage(err.response.data);
    } else {
      setFormData({ name: "", email: "", message: "" });
      setMessage("Message sent! We will contact you soon.");
    }
  }

  function handleInputChange(e) {
    if (e.target.name === "message")
      e.target.value = e.target.value.substring(0, 800);

    formData[e.target.name] = e.target.value;
    const newFormData = { ...formData };
    setFormData(newFormData);
  }

  return (
    <section className=" dark:bg-slate-800" id="contact">
      <div className="mx-auto max-w-7bg-base-100  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
            <section className="  -p-4 flex flex-wrap items-center justify-evenly">
              <div className="mt-2 mt-lg-auto">
                <h1 className="custom-link mb-2 text-4xl  font-extrabold text-gray-900  md:text-5xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">
                  Get in Touch
                  <i className="bi-arrow-right ms-2"></i>
                </h1>
              </div>
            </section>
          </div>
        </div>
        <div className="flex lg:px-20 items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg  lg:visible xs:hidden text-gray-600 dark:text-slate-400">
                We value your trust and are here to help you. Whether you have a
                question, need assistance, or just want to connect, we're
                committed to providing prompt and reliable support. Your
                satisfaction and peace of mind are our top priorities.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Our Address
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      VPO BASANA TEH-KALANAUR
                    </p>
                    <p className="text-gray-600 dark:text-slate-400">
                      ROHTAK HARYANA 124022
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                      <path d="M15 7a2 2 0 0 1 2 2"></path>
                      <path d="M15 3a6 6 0 0 1 6 6"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Contact
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Mobile: +91 8295372047
                    </p>
                    <a
                      href="mailto:ceo@ducklingfit.com"
                      className="text-gray-600 dark:text-slate-400"
                    >
                      Mail: ceo@ducklingfit.com
                    </a>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                      <path d="M12 7v5l3 3"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Working hours
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Monday - Saturday: 08:00 - 22:00
                    </p>
                    <p className="text-gray-600 dark:text-slate-400">
                      Sunday: 08:00 - 12:00
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
              <h2 className="mb-4 text-2xl font-bold dark:text-white">
                Ready to Get Started?
              </h2>
              <form onSubmit={handleSubmit} id="contactForm">
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        form="name"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        form="email"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>{" "}
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label
                      form="textarea"
                      className="pb-1 text-xs uppercase tracking-wider"
                    ></label>
                    <textarea
                      id="textarea"
                      name="message"
                      cols="30"
                      rows="5"
                      placeholder="Write your message..."
                      className="mb-2 resize-none w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    <span>
                      <span
                        className={`${formData.message.length >= 780 ? "text-red-600 font-bold" : ""} `}
                      >
                        {formData.message.length}
                      </span>{" "}
                      / 800 characters
                    </span>
                  </div>
                </div>
                <div className="py-1 text-center flex flex-col items-center">
                  <span className="text-red-700 font-bold">{message}</span>
                  <button
                    className={`${disabled && "hidden"} btn btn-info bg-cyan-300 text-black rounded-full`}
                    disabled={disabled}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;

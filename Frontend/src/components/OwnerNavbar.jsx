import React, { Fragment } from "react";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiDuck, GiPlasticDuck } from "react-icons/gi";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SiDuckdb } from "react-icons/si";
import { logoutOwner } from "../redux/apiCalls/ownerCalls.js";
import UpdatePasswordOwner from "./UpdatePasswordOwner.jsx";

const OwnerNavbar = () => {
  const owner = useSelector((state) => state.owner.owner);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  async function handleLogout() {
    await logoutOwner(dispatch);
  }

  const underlineIfActive = ({ isActive }) =>
    `${isActive ? "text-yellow-200 box-border transition-all border-yellow-300 border-b-2" : ""}`;

  const links = (
    <>
      {!owner && (
        <NavLink to="/owner/signup" className={underlineIfActive}>
          Signup
        </NavLink>
      )}
      {!owner && (
        <NavLink to="/owner/login" className={underlineIfActive}>
          Login
        </NavLink>
      )}
      {owner && (
        <NavLink to="/owner/pastrecords" className={underlineIfActive}>
          Records
        </NavLink>
      )}
      {owner && (
        <NavLink to="/owner/checkin" className={underlineIfActive}>
          Checkin
        </NavLink>
      )}
      <NavLink to="/owner/contactus" className={underlineIfActive}>
        Contact Us
      </NavLink>
    </>
  );

  return (
    <div className=" sticky top-0 z-50 font-montserrat">
      <Disclosure
        as="nav"
        className={`bg-black  p-0 text-white border-none outline-none z-20 shadow-sm border relative `}
      >
        {({ open }) => (
          <div className="relative">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
              <div className="navbar min-h-6 pt-0">
                <div className="navbar-start">
                  <div className="navbar-start  lg:hidden">
                    <div className="dropdown">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7"
                          />
                        </svg>
                      </div>
                      <div
                        tabIndex={0}
                        className="menu menu-sm *:p-1 *:border-1 *:shadow-sm *:border-white bg-slate-900 *:rounded-md *:bg-slate-800 *:m-1 dropdown-content mt-3 z-[1] p-2 shadow rounded-md w-52"
                      >
                        {links}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row-reverse lg:flex-row flex-1 ">
                    <NavLink
                      to="/owner/checkin"
                      className="flex relative items-center"
                    >
                      <GiPlasticDuck
                        size={30}
                        className="mr-2 opacity-100 hover:opacity-0"
                      />
                      <GiDuck
                        size={30}
                        className="mr-2 bg-black absolute top-0 opacity-0 hover:opacity-100"
                      />
                    </NavLink>
                  </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                  <div className="flex flex-row-reverse flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4 ">{links}</div>
                    </div>
                  </div>
                </div>
                <div className="navbar-end">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {owner && (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex p-1 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open owner menu</span>
                            <SiDuckdb size={24} className="text-black" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <div className="block px-4 py-2 text-sm text-black bg-gray-200 text-center font-medium cursor-pointer">
                                  {owner.name}
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={handleLogout}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer",
                                  )}
                                >
                                  Logout
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() =>
                                    document
                                      .getElementById("pcModel")
                                      .showModal()
                                  }
                                  // onClick={handleChangePassword}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer",
                                  )}
                                >
                                  Reset Password
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                </div>
              </div>
              <UpdatePasswordOwner id="pcModel" />
            </div>
          </div>
        )}
      </Disclosure>
      <div className="h-1 w-screen relative">
        {navigation.state === "loading" ? (
          <progress
            className="progress progress-primary absolute h-[5px] border-b-2 border-black bg-stone-700 outline-b-2 outline-black"
            style={{ "--progress-color": "#FACA15" }}
          ></progress>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OwnerNavbar;

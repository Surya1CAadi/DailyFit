import React from "react";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { GiPlasticDuck } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black w-[100vw] text-white outline-none z-10 shadow-sm border-t-2 border-dotted">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 ">
        <div className="md:flex md:justify-between ">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <GiPlasticDuck size={30} className="mr-2" />
              <span className="self-center  text-2xl font-semibold whitespace-nowrap dark:text-black">
                <span className="hover:text-yellow-300">Duckling</span>{" "}
                <span className="text-yellow-300">Fit</span>
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase ">
                Know more
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  {/*<a href="#" className="hover:text-orange-600">*/}
                  {/*  Story*/}
                  {/*</a>*/}
                </li>

                <NavLink to="/contactuspage" className="mb-4 block hover:text-orange-600" >
                    FAQs
                </NavLink>

                <NavLink
                  to="/contactuspage"
                  className="mb-4 block hover:text-orange-600"
                >
                  Contacts
                </NavLink>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase ">
                Site map
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://privacyterms.io/view/DBqEtGlg-CAMLUMSD-9NpuZO/"
                    className="hover:text-orange-600"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://privacyterms.io/view/dDbASFAX-E9jHmf57-9Eeep9/"
                    className="hover:text-orange-600"
                    target="_blank"
                  >
                    Terms and condition
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://privacyterms.io/view/U1HTrseT-iOPpBlYj-dxF7kD/"
                    className="hover:text-orange-600"
                    target="_blank"
                  >
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>

            <Link
              to="/owner/signup"
              className="text-gray-500 dark:text-gray-400 font-medium hover:text-orange-600"
            >
              List your gym
            </Link>
          </div>
        </div>
        <hr className="my-6 border-gray-500 sm:mx-auto dark:border-gray-700 lg:my-8 border-t-2 border-dotted" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <span className="hover:underline">
              Duckling Fit
            </span>
            {/*. All Rights Reserved.*/}
          </span>
          <div className="flex text-gray-400 list-none  space-x-5 px-36">
            <li>
              <a
                href="https://www.youtube.com/channel/UCU5OddbssZGzeBqiOX1vs_w"
                className="social-icon-link  w-8 bi-youtube"
                target="_blank"
              >
                <AiFillYoutube />
              </a>
            </li>

            <li>
              <a
                href="https://wa.me/+918295372047"
                className="social-icon-link w-8 bi-whatsapp"
                target="_blank"
              >
                <AiOutlineWhatsApp />
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/ducklingfit/?next=%2F"
                className="social-icon-link w-8 bi-instagram"
                target="_blank"
              >
                <AiFillInstagram />
              </a>
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

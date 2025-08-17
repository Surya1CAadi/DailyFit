import React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary.jsx";

const HomePage = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h3 className="mb-2  text-center mt-2 mt-lg-auto text-4xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-hihi">
          Select your city
        </h3>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="group relative block">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/home%20page%2Fprayagraj.jpg?alt=media&token=7e6fac2a-2fb0-4db7-8465-6c257168abac"
                alt="Prayagraj"
                className="object-bottom aspect-square w-full object-cover transition duration-500 "
                // loading="lazy"
              />

              <Link to="/gymList/prayagraj">
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="pl-3 text-3xl drop-shadow-2xl font-medium text-white font-hihi">
                    Prayagraj
                  </h3>
                  <ButtonPrimary text="View Gyms"/>
                </div>
              </Link>
            </div>
          </li>

          <li>
            <a href="#" className="group relative block">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/home%20page%2Fdelhi.jpeg?alt=media&token=80ca206f-2383-4db2-9bb8-4a78e8a1b582"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 "
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 ">
                <h3 className="text-3xl font-medium text-white font-hihi">
                  Delhi
                </h3>

                <Link to="/gymList/delhi">
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="pl-3 text-3xl drop-shadow-2xl font-medium text-white font-hihi">
                      Delhi
                    </h3>
                    <ButtonPrimary text="View Gyms"/>
                  </div>
                </Link>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="group relative block">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/home%20page%2FBangalore.jpeg?alt=media&token=1ab3c185-9746-4fea-8dfa-6874abf4cecd"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 "
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-3xl font-medium text-white font-hihi">
                  Bangalore
                </h3>

                <button className="btn hover:bg-yellow-200 border-none hover:scale-[105%] bg-yellow-300 text-black rounded-full">
                  Coming soon
                </button>
              </div>
            </a>
          </li>
          <li>
            <a href="#" className="group relative block">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/home%20page%2FMumbai.jpeg?alt=media&token=98a7011a-ec89-4c22-a26c-e14c49c1ea90"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 "
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-3xl font-medium text-white font-hihi">
                  Mumbai
                </h3>

                <button className="btn hover:bg-yellow-200 border-none hover:scale-[105%] bg-yellow-300 text-black rounded-full">
                  Coming soon
                </button>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group relative block">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/home%20page%2FPune.jpg?alt=media&token=d5cf1e40-f7e2-4050-aeef-b485450a8731"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 "
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-3xl font-medium text-white font-hihi">
                  Pune
                </h3>

                <button className="btn hover:bg-yellow-200 border-none hover:scale-[105%] bg-yellow-300 text-black rounded-full">
                  Coming soon
                </button>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomePage;

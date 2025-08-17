import React from "react";
import delhi from "../assets/my/delhi.jpg"
import {Link, NavLink} from "react-router-dom";


const LandingPage = () => {
  return (
    <main className="max-w-[95%] mx-auto">
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: "75vh"
        }}>
      <div className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/landing%20page%2FLanding1.jpeg?alt=media&token=ab48510b-6cb8-44f6-932c-c11143c7c5b9)"
          }}>
        <span id="blackOverlay" className="w-full h-full absolute opacity-45 bg-black"></span>
      </div>
      <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="">
                <h1 className="text-white  custom-link mb-2 text-6xl font-extrabold   md:text-5xl lg:text-6xl   text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400  font-hihi">
                  WHAT!! <br></br> <strong>One day subscription</strong>
                </h1>
                <NavLink to="/home" id="section2" className="btn btn-info bg-cyan-300 text-black rounded-full">Book Your Slot</NavLink>
              </div>
            </div>

          </div>
      </div>
      <div
        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
        style={{ height: "70px" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>

    <section className="pb-20 bg-gray-300 -mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                  <i className="fas fa-award"></i>
                </div>
                <h6 className="text-xl font-semibold">Money saving</h6>
                <p className="mt-2 mb-4 text-gray-600">
                Looking to save on fitness? Maximize your workouts and savings with our one-day gym pass!                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                  <i className="fas fa-retweet"></i>
                </div>
                <h6 className="text-xl font-semibold">
                  Best for travelers
                </h6>
                <p className="mt-2 mb-4 text-gray-600">
                Whether you're on a business trip or exploring a new city, take advantage of our facilities to maintain your fitness routine.                 </p>
              </div>
            </div>
          </div>

          <div className="pt-6 w-full md:w-4/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                  <i className="fas fa-fingerprint"></i>
                </div>
                <h6 className="text-xl font-semibold">
                  Many option
                </h6>
                <p className="mt-2 mb-4 text-gray-600">
                Convenient option for individuals who are visiting an area temporarily or want to try out a gym before committing to a longer membership.                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-wrap items-center mt-32">
          <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
            <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
              <i className="fas fa-user-friends text-xl"></i>
            </div>
            <h3 className="text-3xl mb-2 font-semibold leading-normal">
              Working out 1-2 times a week can lead to weight loss &amp; decrease risk of illness
            </h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
            A new study has found that working out once or twice a week can produce weight loss.
            </p>
            <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
            The study found that those who condense their fitness regimen into one or two sessions per week could achieve weight loss similar to those who work out more regularly.

            </p>
            <a
              href="https://www.healthline.com/health-news/exercising-1-to-2-days-a-week-lose-weight"
              className="font-bold text-gray-800 mt-8"
            >
              Check on Healthline!
            </a>
          </div>

          <div className="w-[95%] md:w-[35%] mt-3 px-4 mr-auto ml-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 shadow-lg rounded-lg ">
              <img
                alt="..."
                src= "https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/landing%20page%2FLanding2.jpeg?alt=media&token=2ae34581-3166-4f68-b2c5-a0473ba48cda"
                className="w-full align-middle rounded-t-lg"
              />
              <blockquote className="relative p-8 mb-4">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  className="absolute left-0 w-full block"
                  style={{
                    height: "95px",
                    top: "-94px"
                  }}
                >
                  
                </svg>
                <h4 className="text-xl font-bold text-white">
                  "A healthy mind in a healthy body"
                </h4>
                
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section className="relative py-20">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: "80px" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-white fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="items-center flex flex-wrap">
          <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
            <img
              alt="..."
              className="max-w-full rounded-lg shadow-lg"
              src="https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/landing%20page%2FLanding3.jpeg?alt=media&token=910d8392-8531-4d61-9dce-6c83edc11cc0"
            />
          </div>
          <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div className="md:pr-12">
              <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                <i className="fas fa-rocket text-xl"></i>
              </div>
              <h3 className="text-3xl font-semibold">
                Your gym is 4 steps away
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                
              </p>
              <ul className="list-none mt-6">
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                        <i className="fas fa-fingerprint"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-600">
                        Select your city
                      </h4>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                        <i className="fab fa-html5"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-600">Select your fav gym</h4>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                        <i className="far fa-paper-plane"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-600">Select your desired date and time</h4>
                    </div>
                  </div>
                </li>
                <li className="py-2">
                  <div className="flex items-center">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                        <i className="far fa-paper-plane"></i>
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-600">Payment then good to go</h4>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>


    

    
    
  </main>
  );
};

export default LandingPage;

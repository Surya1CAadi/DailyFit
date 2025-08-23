import React, { useState } from "react";
import ToggleButton from "../components/ToggleButton";
import { Link, useLoaderData } from "react-router-dom";
import { request } from "../requestMethods.js";
import { BiMaleFemale } from "react-icons/bi";
import { FaFemale } from "react-icons/fa";
import GymListingCard from "../components/GymListingCard.jsx";

export async function loadGyms({ params }) {
  const response = await request.post("/gym/findGyms", { city: params.city });
  return response.data;
}

const GymListingPage = () => {
  const allGyms = useLoaderData().data.gyms;

  const [gyms, setGyms] = useState(allGyms);

  function filterGender(e) {
    if (e.target.checked) setGyms(allGyms.filter((gym) => gym.sex === "F"));
    else setGyms(allGyms);
  }

  return (
    <section className="max-w-[1400px] p-2 mx-auto">
      <div>
        <div className="my-6 flex flex-wrap justify-center items-center bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]  md:justify-between">
          <h1 className="text-3xl font-montserrat font-medium my-2 tooltip mr-4 mb-4">Select gym</h1>
          <div className="flex flex-row gap-2">
            <div>
              <label htmlFor="SortBy" className="sr-only">
                SortBy
              </label>

              <select
                id="SortBy"
                className="h-10 bg-base-200 rounded border-gray-300 text-sm"
              >
                <option>Sort By</option>
                <option value="Title, DESC">Name, ABC</option>
                <option value="Title, ASC">Name, ZYX</option>
                <option value="Price, DESC">Price, Low</option>
                <option value="Price, ASC">Price, High</option>
              </select>
            </div>
            <ToggleButton
                onChange={filterGender}
                left={<BiMaleFemale />}
                right={<FaFemale />}
            />
          </div>
        </div>

        <ul className="gap- bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] mt-4 grid gap-3  sm:grid-cols-2 lg:grid-cols-4">
          {gyms
            ? gyms.map((gym) => <GymListingCard key={gym._id} gym={gym}/> )
            : "No gyms found, please select different filters"}
        </ul>
      </div>
    </section>
  );
};

export default GymListingPage;

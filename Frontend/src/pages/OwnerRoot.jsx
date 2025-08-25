import React, {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import OwnerNavbar from "../components/OwnerNavbar.jsx";

const Root = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }, [location]);

    return (<>
        <OwnerNavbar/>
        <div
            className="grow overflow-hidden w-screen bg-base-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="">
                <Outlet/>
            </div>
        </div>
        <Footer/>
    </>);
};

export default Root;

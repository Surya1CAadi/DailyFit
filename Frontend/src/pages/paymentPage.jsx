import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pay from "../components/Pay.jsx";
import ThankYou from "../components/ThankYou.jsx";
import {useNavigate} from "react-router-dom";
import {protect} from "../helperFunctions/protect.js";

function PaymentPage() {

  const user = useSelector((state) => state.user.user);
  const gym = useSelector((state) => state.auxiliary.gymData);
  const navigate = useNavigate();

  useEffect(() => {
    protect(navigate,user,undefined,"You need to be logged in before buying a subscription.");
    protect(navigate, gym, "/gymList/delhi", "Please select a gym first");
  }, [user, gym]);


  const formData = useSelector((state) => state.auxiliary.subscriptionFormData);

  const [phase, setPhase] = useState("pay");

  useEffect(() => {
    setPhase(formData.status);
  }, [formData]);

  return <div className="">
    {phase==="pay"?<Pay gym={gym}/>:<ThankYou/>}
  </div>;
}

export default PaymentPage;

import React, { useEffect, useState } from "react";
import SignupUser from "../components/SignupUser.jsx";
import EmailVerification from "../components/EmailVerification.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setLoginRedirect} from "../redux/auxiliarySlice.js";

const SignupPage = () => {
  let user = useSelector((state) => state.user.user);
  const loginRedirect = useSelector((state) => state.auxiliary.loginRedirect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(loginRedirect ? loginRedirect : "/", { replace: true });
      dispatch(setLoginRedirect(null));
    }
  }, [user]);

  const [phase, setPhase] = useState("signup");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    passwordConfirm: "",
  });

  return (
    <>
      {/*render form in signup phase*/}
      {phase === "signup" && (
        <SignupUser
          setPhase={setPhase}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {/*render emailVerification after sending email*/}
      {phase === "emailVerification" && (
        <EmailVerification setPhase={setPhase} email={formData.email} formData={formData} />
      )}
    </>
  );
};

export default SignupPage;

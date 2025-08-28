import { request } from "../../requestMethods.js";
import {
  loginFailed,
  loginSuccess,
  logoutSuccess,
  resetAll,
  startFetch,
} from "../userSlice.js";
import { toast } from "react-toastify";
import to from "await-to-js";

export const loginUser = async (dispatch, body) => {
  dispatch(resetAll());
  dispatch(startFetch());
  const id = toast.loading("Logging you in");
  try {
    // api call
    const [err, res] = await to(request.post("/user/login", body));
    if (err) {
      toast.update(id, {
        render: `${err.response.data.message || err.response.data || "Some error occurred please try again later"}`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return false;
    } else {
      // update state if login successfully
      dispatch(loginSuccess({ user: res.data.data.user }));
      toast.update(id, {
        render: "Login success!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }
    return true;
  } catch (error) {
    dispatch(loginFailed(error?.response?.data?.message));
    toast.update(id, {
      render: error?.response?.data?.message,
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
    return false;
  }
};

export const signup1_2 = async (dispatch, formData, tst1, tst2) => {
  dispatch(resetAll());
  dispatch(startFetch());
  const id = toast.loading(tst1 || "Signing you in");

  const [err, response] = await to(request.post("/user/signup", formData));
  if (err || ((response.status / 100) | 0) !== 2) {
    const errorMessage =
      err.response?.data?.message ||
      err.response.data ||
      "Some error occurred! please try again later.";
    toast.update(id, {
      render: errorMessage,
      type: "error",
      isLoading: false,
      autoClose: 0,
    });
    return false;
  } else {
    toast.update(id, {
      render: `${tst2 || "Verify email"}`,
      type: "warning",
      isLoading: false,
      autoClose: 1000,
    });
    return true;
  }
};

//returns 1 if need to go back
//2 if otp mismatch
//3 if otp matches
export const signup2_2 = async (dispatch, email, otp) => {
  dispatch(resetAll());
  dispatch(startFetch());
  const id = toast.loading("Checking OTP");
  try {
    if (!email) {
      toast.update(id, {
        render: "Email id not found! please signup again.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
      return 1;
    }

    const response = await request.post("/user/verifyEmail", {
      email,
      emailVerificationOtp: otp,
    });
    if (((response.status / 100) | 0) !== 2) throw new Error();
    dispatch(loginSuccess({ user: response.data.data.user }));
    toast.update(id, {
      render: "Email verified!",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
    return 3;
  } catch (e) {
    toast.update(id, {
      render:
        e.response?.data?.message ||
        e.response.data ||
        "Some error occurred! please try again later.",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
    return 2;
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(startFetch());
  const id = toast.loading("Logging out!");
  try {
    const response = await request.post("/user/logout");
    if (((response.status / 100) | 0) !== 2) throw new Error();
    dispatch(logoutSuccess());
    toast.update(id, {
      render: "Logged out successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
    return true;
  } catch (e) {
    const errorMessage =
      e.response?.data?.message ||
      "Some error occurred! please try again later.";
    dispatch(loginFailed(errorMessage));
    toast.update(id, {
      render: errorMessage,
      type: "error",
      isLoading: false,
      autoClose: 0,
    });
    return false;
  }
};

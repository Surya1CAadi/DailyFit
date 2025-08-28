import {loginFailed, loginSuccess, logoutSuccess} from "../ownerSlice.js";
import {toast} from "react-toastify";
import {request} from "../../requestMethods.js";

export const loginOwner = async (dispatch, body) => {
    const id = toast.loading("Logging you in");
    try {
        // api call
        const res = await request.post("/owner/login", body);
        // update state if login successfully
        dispatch(loginSuccess({owner: res.data.data.owner}));
        toast.update(id, {
            render: "Login success!", type: "success", isLoading: false, autoClose: 1000,
        });
        return true;
    } catch (error) {
        dispatch(loginFailed(error?.response?.data?.message));
        toast.update(id, {
            render: error?.response?.data?.message, type: "error", isLoading: false, autoClose: 2000,
        });
        return false;
    }
}

export const logoutOwner = async (dispatch) => {
    const id = toast.loading("Logging out!")
    try {
        const response = await request.post("/owner/logout");
        if ((response.status / 100 | 0) !== 2) throw new Error();
        dispatch(logoutSuccess());
        toast.update(id, {render: "Logged out successfully!", type: "success", isLoading: false, autoClose: 2000});
        return true;
    } catch (e) {
        const errorMessage = e.response?.data?.message || "Some error occurred! please try again later.";
        dispatch(loginFailed(errorMessage));
        toast.update(id, {render: errorMessage, type: "error", isLoading: false, autoClose: 0});
        return false;
    }
}

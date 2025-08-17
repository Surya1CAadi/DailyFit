import { createSlice } from "@reduxjs/toolkit";

export const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    owner: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.owner = action.payload.owner;
    },
    loginFailed: (state, action) => {
      state.owner = null;
    },
    logoutSuccess: (state) => {
      state.owner = null;
    },
    logoutFailed: (state, action) => {
      //well maybe it does nothing :3
    },
    clearAll: (state) => {
      state.owner = null;
    },
  },
});

export const { clearAll, logoutSuccess, loginFailed, logoutFailed, loginSuccess } =
  ownerSlice.actions;
const ownerReducer = ownerSlice.reducer;
export default ownerReducer;

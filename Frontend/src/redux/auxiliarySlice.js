//this is being used as a way to save things to local storage

import { createSlice } from "@reduxjs/toolkit";

export const auxiliarySlice = createSlice({
  name: "auxiliary",
  initialState: {
    loginRedirect: null,
    subscriptionFormData: null,
    gymData: null,
  },
  reducers: {
    setLoginRedirect: (state, action) => {
      state.loginRedirect = action.payload;
    },
    setSubscriptionFormData: (state, action) => {
      state.subscriptionFormData = action.payload;
    },
    setGymData: (state, action) => {
      state.gymData = action.payload;
    },
    clearAll: (state) => {
      state.loginRedirect = null;
      state.subscriptionFormData = null;
      state.gymData = null;
    },
  },
});

export const { clearAll, setLoginRedirect, setSubscriptionFormData, setGymData } =
  auxiliarySlice.actions;
const auxiliaryReducer = auxiliarySlice.reducer;
export default auxiliaryReducer;

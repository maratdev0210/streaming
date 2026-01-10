import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";
import type { IAuth } from "./model";
import type { IEmail, IName } from "./model";

const initialState: IAuth = {
  email: "",
  password: "",
  name: "",
  isEmailStepDone: false,
  isPasswordStepDone: false,
  isAuthStepDone: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<IEmail>) => {
      state.email = action.payload.email;
      state.isEmailStepDone = true;
    },

    setPasswordField: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.isPasswordStepDone = true;
    },

    setNameField: (state, action: PayloadAction<IName>) => {
      state.name = action.payload.name;
      state.isAuthStepDone = true;
    },

    goBackToPassword: (state) => {
      state.isPasswordStepDone = false;
      state.name = "";
    },

    goBackToEmail: (state) => {
      state.isEmailStepDone = false;
      state.password = "";
    },
  },
});

export const {
  setEmail,
  setPasswordField,
  goBackToEmail,
  setNameField,
  goBackToPassword,
} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

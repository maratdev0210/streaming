import type { ILogin } from "./model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";

const initialState: ILogin = {
  email: "",
  password: "",
  isEmailStepDone: false,
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isEmailStepDone = true;
    },
    setLoginState: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setEmail, setLoginState } = loginSlice.actions;
export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;

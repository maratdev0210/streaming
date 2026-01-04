import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";
import type { IAuth } from "./model";
import type { IEmail } from "./model";

const initialState: IAuth = {
  email: "",
  isNextStep: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNextStep: (state, action: PayloadAction<IEmail>) => {
      state.email = action.payload.email;
      state.isNextStep = true;
    },
  },
});

export const { setNextStep } = authSlice.actions;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectIsNextStep = (state: RootState) => state.auth.isNextStep;

export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import trackReducer from "../../entities/track/model/trackSlice";
import authReducer from "../../entities/auth/model/authSlice";
import loginReducer from "../../entities/login/model/loginSlice";

export const store = configureStore({
  reducer: {
    track: trackReducer,
    auth: authReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

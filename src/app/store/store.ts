import { configureStore } from "@reduxjs/toolkit";
import trackReducer from "../../entities/track/model/trackSlice";
import authReducer from "../../entities/auth/model/authSlice";

export const store = configureStore({
  reducer: {
    track: trackReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

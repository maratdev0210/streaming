import { configureStore } from "@reduxjs/toolkit";
import trackReducer from "../../entities/track/model/trackSlice";
import authReducer from "../../entities/auth/model/authSlice";
import loginReducer from "../../entities/login/model/loginSlice";
import sidebarReducer from "../../features/Sidebar/ControlSidebar/model/sidebarSlice";

export const store = configureStore({
  reducer: {
    track: trackReducer,
    auth: authReducer,
    login: loginReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

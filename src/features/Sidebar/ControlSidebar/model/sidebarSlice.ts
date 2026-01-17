import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../../app/store/store";
import type { ISidebar } from "./model";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ISidebar = {
  isSidebarOpen: false,
  isIconShownOnHover: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarState: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIconShownOnHover: (state, action: PayloadAction<boolean>) => {
      state.isIconShownOnHover = action.payload;
    },
  },
});

export const { setSidebarState, setIconShownOnHover } = sidebarSlice.actions;
export const selectSidebar = (state: RootState) => state.sidebar;

export default sidebarSlice.reducer;

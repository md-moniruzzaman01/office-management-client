import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isOpen: true, // Default value
  },
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    setState: (state, action) => {
      state.isOpen = action.payload === "inventory";
    },
  },
});

export const { toggle, setState } = dashboardSlice.actions;
export default dashboardSlice.reducer;

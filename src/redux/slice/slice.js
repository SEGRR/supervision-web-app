import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  user: {
    isAuthenticated: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.user.isAuthenticated = action.payload;
    },
    getIsAuthenticated: (state) => {
      return state.user.isAuthenticated;
    },
  },
});

export const { setIsAuthenticated, getIsAuthenticated } = userSlice.actions;

export default userSlice.reducer;

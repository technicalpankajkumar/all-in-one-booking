import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem(import.meta.env.VITE_APP_ACCESS_TOKEN_KEY || "access_token"),
  refreshToken: localStorage.getItem(import.meta.env.VITE_APP_REFRESH_TOKEN_KEY || "refresh_token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user?: User; accessToken?: string; refreshToken?: string }>) => {
      if (action.payload.user) state.user = action.payload.user;
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
        localStorage.setItem(import.meta.env.VITE_APP_ACCESS_TOKEN_KEY || "access_token", action.payload.accessToken);
      }
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem(import.meta.env.VITE_APP_REFRESH_TOKEN_KEY || "refresh_token", action.payload.refreshToken);
      }
    },
    uiLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem(import.meta.env.VITE_APP_ACCESS_TOKEN_KEY || "access_token");
      localStorage.removeItem(import.meta.env.VITE_APP_REFRESH_TOKEN_KEY || "refresh_token");
    },
  },
});

export const { setCredentials, uiLogout } = authSlice.actions;
export default authSlice.reducer;

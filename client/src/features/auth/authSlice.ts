import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  userId: string | null;
  role: string | null;
  token: string | null;
}
const initialState: AuthState = {
  userId: null,
  role: null,
  token: null,
};
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { token: string }) => {
        const decoded: { userId: string; role: string } = jwtDecode(
          response.token
        );
        return {
          token: response.token,
          userId: decoded.userId,
          role: decoded.role,
        };
      },
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token || "");
      localStorage.setItem("userId", action.payload.userId || "");
    },
    logout: (state) => {
      state.userId = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const { useLoginMutation, useRegisterMutation } = authApi;

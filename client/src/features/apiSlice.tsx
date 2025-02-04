import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { setUser } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL as string,
  mode: "cors",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const response = await baseQuery(args, api, extraOptions);

  if (response?.error?.status === 401) {
    toast.error("Session Expired");
    api.dispatch(setUser({ userId: null, role: null, token: null }));
  }

  if ("error" in response) {
    const { error } = response;
    if (error && typeof error === "object" && "data" in error) {
      const errData = error.data as { message?: string };
      toast.error(errData?.message || "An unexpected error occurred");
    } else {
      toast.error("An unexpected error occurred!");
    }
  }

  if ("data" in response) {
    const { data } = response;
    if (data && typeof data === "object" && "message" in data) {
      toast.success((data as { message?: string }).message || "Success!");
    }
  }

  return response;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

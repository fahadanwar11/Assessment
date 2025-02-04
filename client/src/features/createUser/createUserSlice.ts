import { apiSlice } from "../apiSlice";

export const createUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/create-user",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Users"],
    }),
    getAllUsers: builder.query({
      query: (role) => ({
        url: `/user/get-users?role=${role}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const { useCreateUserMutation, useGetAllUsersQuery } = createUserApi;

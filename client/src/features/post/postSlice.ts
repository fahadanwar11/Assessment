import { apiSlice } from "../apiSlice";

export const createPostApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyPosts: builder.query({
      query: (userId) => ({
        url: `/post/get-my-posts?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),

    createPost: builder.mutation({
      query: (body) => ({
        url: "/post/create-post",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/post/delete-post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetMyPostsQuery,
  useDeletePostMutation,
} = createPostApi;

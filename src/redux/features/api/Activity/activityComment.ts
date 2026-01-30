import baseApi from "../../../api/baseApi";

const ActivityCommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createActivityComment: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/comments",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),

    getActivitiesComments: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/comments?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleActivityComment: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/comments/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteActivityComment: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/comments/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editActivityComment: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/comments/${id}`,
          method: "PATCH",
          headers: {
            authorization: token,
          },
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),

    createCommentReaction: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/comment-reactions",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),

    getCommentsReactions: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/comment-reactions?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),

    deleteCommentReaction: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/comment-reactions/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateActivityCommentMutation,
  useGetSingleActivityCommentQuery,
  useDeleteActivityCommentMutation,
  useEditActivityCommentMutation,
  useGetActivitiesCommentsQuery,
  useCreateCommentReactionMutation,
  useGetCommentsReactionsQuery,
  useDeleteCommentReactionMutation,
} = ActivityCommentApi;

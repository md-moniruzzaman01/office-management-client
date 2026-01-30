import baseApi from "../../../api/baseApi";

const ActivityReactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createActivityReaction: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/activity-reactions",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),

    getActivitiesReactions: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/activity-reactions?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleActivityReaction: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/activity-reactions/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteActivityReaction: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/activity-reactions/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editActivityReaction: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/activity-reactions/${id}`,
          method: "PATCH",
          headers: {
            authorization: token,
          },
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateActivityReactionMutation,
  useDeleteActivityReactionMutation,
  useEditActivityReactionMutation,
  useGetSingleActivityReactionQuery,
  useGetActivitiesReactionsQuery,
} = ActivityReactionApi;

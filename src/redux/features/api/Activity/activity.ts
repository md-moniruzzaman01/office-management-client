import baseApi from "../../../api/baseApi";

const ActivityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createActivity: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/activities",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),

    getActivities: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/activities?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleActivity: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/activities/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteActivity: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/activities/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editActivity: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/activities/${id}`,
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
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useEditActivityMutation,
  useGetSingleActivityQuery,
  useGetActivitiesQuery,
} = ActivityApi;

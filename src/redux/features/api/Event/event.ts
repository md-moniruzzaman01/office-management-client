import baseApi from "../../../api/baseApi";

const EventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/events",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getEvents: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/events?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleEvent: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/events/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteEvent: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/events/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editEvent: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/events/${id}`,
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
  useCreateEventMutation,
  useDeleteEventMutation,
  useEditEventMutation,
  useGetEventsQuery,
  useGetSingleEventQuery,
} = EventApi;

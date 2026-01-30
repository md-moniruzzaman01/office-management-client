import baseApi from "../../../api/baseApi";

const HolidaysApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createHoliday: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/holidays",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getHolidays: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/holidays?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleHoliday: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/holidays/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteHoliday: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/holidays/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editHoliday: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/holidays/${id}`,
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
  useCreateHolidayMutation,
  useDeleteHolidayMutation,
  useEditHolidayMutation,
  useGetHolidaysQuery,
  useGetSingleHolidayQuery,
} = HolidaysApi;

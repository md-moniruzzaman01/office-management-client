import baseApi from "../../../api/baseApi";

const LeaveApplicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLeaveApplication: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/leave-applications",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getLeaveApplications: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/leave-applications?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getPersonalLeaveApplications: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/leave-applications/personal?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleLeaveApplication: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/leave-applications/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteLeaveApplication: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/leave-applications/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editLeaveApplication: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/leave-applications/${id}`,
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
  useCreateLeaveApplicationMutation,
  useDeleteLeaveApplicationMutation,
  useEditLeaveApplicationMutation,
  useGetLeaveApplicationsQuery,
  useGetSingleLeaveApplicationQuery,
  useGetPersonalLeaveApplicationsQuery,
} = LeaveApplicationApi;

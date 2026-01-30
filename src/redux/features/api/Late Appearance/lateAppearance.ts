import baseApi from "../../../api/baseApi";

const LateAppearanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLateAppearance: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/late-appearances",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getLateAppearances: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/late-appearances?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleLateAppearance: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/late-appearances/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteLateAppearance: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/late-appearances/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editLateAppearance: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/late-appearances/${id}`,
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
  useCreateLateAppearanceMutation,
  useDeleteLateAppearanceMutation,
  useEditLateAppearanceMutation,
  useGetLateAppearancesQuery,
  useGetSingleLateAppearanceQuery,
} = LateAppearanceApi;

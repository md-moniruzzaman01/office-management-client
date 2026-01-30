import baseApi from "../../../api/baseApi";

const PowerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPower: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/powers",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getPowers: builder.query({
      query: ({ token }) => {
        return {
          url: `/powers`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSinglePower: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/powers/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deletePower: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/powers/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editPower: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/powers/${id}`,
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
  useCreatePowerMutation,
  useDeletePowerMutation,
  useEditPowerMutation,
  useGetPowersQuery,
  useGetSinglePowerQuery,
} = PowerApi;

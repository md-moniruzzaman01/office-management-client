import baseApi from "../../../api/baseApi";

const BranchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBranch: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/branches",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getBranches: builder.query({
      query: ({ token }) => {
        return {
          url: `/branches`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleBranch: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/branches/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteBranch: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/branches/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editBranch: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/branches/${id}`,
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
  useCreateBranchMutation,
  useGetBranchesQuery,
  useGetSingleBranchQuery,
  useDeleteBranchMutation,
  useEditBranchMutation,
} = BranchesApi;

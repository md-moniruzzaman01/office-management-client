import baseApi from "../../../api/baseApi";

const DepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/departments",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getDepartments: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/departments?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleDepartment: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/departments/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteDepartment: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/departments/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editDepartment: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/departments/${id}`,
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
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useEditDepartmentMutation,
  useGetDepartmentsQuery,
  useGetSingleDepartmentQuery,
} = DepartmentApi;

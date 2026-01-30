import baseApi from "../../../api/baseApi";

const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/users/create-user",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getUsers: builder.query({
      query: ({ token, query }) => {
        return {
          url: `/users?${query}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: ({ token, id }) => {
        return {
          url: `/users/${id}`,
          headers: {
            authorization: token,
          },
        };
      },
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
          headers: {
            authorization: token,
          },
        };
      },
      invalidatesTags: ["user"],
    }),
    editUser: builder.mutation({
      query: ({ token, fullData, id }) => {
        return {
          url: `/users/${id}`,
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
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetSingleUserQuery,
  useGetUsersQuery,
} = UserApi;

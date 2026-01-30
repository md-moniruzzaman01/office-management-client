import baseApi from "../../../api/baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ fullData }) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
    getCurrentUser: builder.query({
      query: () => {
        return {
          url: "/auth/me",
        };
      },
      providesTags: ["user"],
    }),
    changePassword: builder.mutation({
      query: ({ fullData, token }) => {
        return {
          url: "/auth/change-password",
          headers: {
            authorization: token,
          },
          method: "POST",
          body: fullData,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useGetCurrentUserQuery,
} = AuthApi;

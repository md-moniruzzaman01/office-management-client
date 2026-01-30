import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../shared/config/secret";
import { getFromLocalStorage } from "../../shared/Helpers/local_storage";
import { authKey } from "../../shared/config/constaints";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = getFromLocalStorage(authKey);
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshToken = localStorage.getItem("refreshToken");

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { token: refreshToken },
      },
      api,
      extraOptions
    );

    if (
      refreshResult.data &&
      typeof refreshResult.data === "object" &&
      "accessToken" in refreshResult.data
    ) {
      const newAccessToken = (refreshResult.data as { accessToken: string })
        .accessToken;
      localStorage.setItem("accessToken", newAccessToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      // localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      // window.location.href = "/login";
    }
  }

  return result;
};

export default baseQueryWithReauth;

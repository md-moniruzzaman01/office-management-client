import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../shared/config/secret";
import { getFromLocalStorage } from "../../shared/Helpers/local_storage";
import { authKey } from "../../shared/config/constaints";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers) => {
      const token = getFromLocalStorage(authKey);
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  // baseQuery: baseQueryWithReauth,
  tagTypes: ["user", "letter"],
  endpoints: () => ({}),
});

export default baseApi;

import { createApi, fetchBaseQuery, FetchArgs } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setCredentials, uiLogout } from "../features/auth/authSlice";

const BASE_URL = import.meta.env.VITE_APP_API_URL || "https://your-backend.com/api";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_TOKEN_KEY || "access_token";
const REFRESH_KEY = import.meta.env.VITE_APP_REFRESH_TOKEN_KEY || "refresh_token";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.accessToken ?? localStorage.getItem(ACCESS_KEY);
    if (token) headers.set("Authorization", `${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error && (result.error as any).status === 401) {
    // try to get new tokens
    const refresh_token = localStorage.getItem(REFRESH_KEY);
    if (!refresh_token) {
      api.dispatch(uiLogout());
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/auth/re-generate-token",
        method: "PUT",
        body: { refresh_token },
      } as FetchArgs,
      api,
      extraOptions
    );

    console.log('REFETCH API',refreshResult)

    if (refreshResult?.success) {
      // Expecting { access_token, refresh_token, user? }
      const data: any = refreshResult;
      api.dispatch(setCredentials({ accessToken: refreshResult?.access_token }));
      // retry original
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(uiLogout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Booking", "Car", "Driver", "Auth"],
  endpoints: () => ({}),
});

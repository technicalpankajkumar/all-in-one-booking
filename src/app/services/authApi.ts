import { baseApi } from "./baseApi";
import { User } from "../types";
import { setCredentials } from "../features/auth/authSlice";

interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user?: User;
    success?:boolean;
    message?:string;
    error?:string;
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { login: string; password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Correct dispatch
                    dispatch(
                        setCredentials({
                            user: data.user,
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                        })
                    );
                } catch (err) {
                    console.log("LOGIN FAILED", err);
                }
            },
        }),
        logout: builder.mutation<any,{refresh_token:string}>({
            query: (payload) => ({ url: "/auth/logout", method: "POST", body: payload, }),
        }),
        register: builder.mutation({
            query: (payload) => ({ url: "/auth/register", method: "POST", body: payload })
        }),
        verification: builder.mutation({
            query: (payload) => ({ url: "/auth/activate-account", method: "POST", body: payload })
        })
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useVerificationMutation } = authApi;

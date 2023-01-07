import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type PostLogin = { email: string; password: string };
export type LoginResponse = { userId: string; token: string };
export type PutSignup = { email: string; password: string; name: string };

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth/` }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, PostLogin>({
      query: (body) => ({ url: 'login', method: 'POST', body }),
    }),
    signup: builder.mutation<void, PutSignup>({
      query: (body) => ({ url: 'signup', method: 'PUT', body }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

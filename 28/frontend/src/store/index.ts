import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from './auth/slice';
import { api } from './graphql/api';
import { api as authApi } from './graphql/authApi';
import { postImageApi } from './postImage';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  [postImageApi.reducerPath]: postImageApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (gdm) =>
    gdm().concat(...[authApi.middleware, api.middleware, postImageApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { authApi } from './auth/apis';
import authReducer from './auth/slice';
import { postsApi } from './feed/apis';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (gdm) => gdm().concat(authApi.middleware).concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

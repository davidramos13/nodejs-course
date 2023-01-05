import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { postsApi } from './feed/apis';

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (gdm) => gdm().concat(postsApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { readAllFromStorage, removeStorageValues, saveToStorage } from '../../util/storage';

type AuthState = { isAuth: boolean; userId: string };
type Credentials = { userId: string; token: string };

const slice = createSlice({
  name: 'auth',
  initialState: { userId: '', isAuth: false } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { userId, token } }: PayloadAction<Credentials>) => {
      state.userId = userId;
      state.isAuth = true;
      saveToStorage(token, userId);
    },
    checkAuth: (state) => {
      const { token, expiryDate, userId } = readAllFromStorage();
      if (!(token && expiryDate && userId)) return;

      if (new Date(expiryDate) <= new Date()) {
        removeStorageValues();
        return;
      }
      state.userId = userId;
      state.isAuth = true;
    },
    logout: (state) => {
      state.userId = '';
      state.isAuth = false;
      removeStorageValues();
    },
  },
});

export const { setCredentials, checkAuth, logout } = slice.actions;

const authReducer = slice.reducer;
export default authReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../index';
import { INITIAL_USER_VALUE, User } from '../../models/User.model.ts';

interface UserReducer {
  user: User,
  isLoaded: boolean,
}

const initialState: UserReducer = {
  user: INITIAL_USER_VALUE,
  isLoaded: false,
};

export const getIsUserLoaded = (state: RootState): boolean => state.user.isLoaded;
export const getLoggedUser = (state: RootState): User => state.user.user;

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setLoggedUser: (state: UserReducer, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers() {},
});

export const { setLoggedUser } = userSlice.actions;
export default userSlice.reducer;

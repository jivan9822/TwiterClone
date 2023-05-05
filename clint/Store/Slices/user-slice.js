import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginUser: null,
  allUser: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAllUser(state, action) {
      state.allUser = [...action.payload];
    },
    setLoginUser(state, action) {
      state.loginUser = action.payload;
    },
    addTweetToUser(state, action) {
      if (state.loginUser?.reTweets) {
        state.loginUser.reTweets.push(action.payload);
      }
    },
    setUserLogout(state) {
      state.loginUser = null;
    },
    updateUser(state, action) {
      const payload = action.payload;
      state.allUser = [...payload.users];
      state.loginUser = payload.user;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;

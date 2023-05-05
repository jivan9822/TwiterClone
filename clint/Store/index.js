import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/user-slice';
import postSlice from './Slices/post-slice';

const store = configureStore({
  reducer: { user: userSlice.reducer, post: postSlice.reducer },
});

export default store;

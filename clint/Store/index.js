import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/User-Slice';
import postSlice from './Slices/post-slice';

const store = configureStore({
  reducer: { user: userSlice.reducer, post: postSlice.reducer },
});

export default store;

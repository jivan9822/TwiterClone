import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginUser: null,
  showReplies: false,
  allUser: [],
  postData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginUser(state, action) {
      state.loginUser = action.payload;
    },
    setUserLogout(state) {
      state.loginUser = null;
    },
    setAllUser(state, action) {
      state.allUser = action.payload;
    },
  },
});
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostData(state, action) {
      state.postData = action.payload;
    },
    setAddPost(state, action) {
      state.postData = [action.payload, ...state.postData];
    },
    setDeletePost(state, action) {
      let newData = state.postData;
      let user = state.loginUser;
      let users = state.allUser;

      if (action.payload.retweetData?._id) {
        // remove retweet user from original post
        newData = state.postData.map((each) => {
          if (each._id === action.payload.retweetData._id) {
            each.reTweetUsers = each.reTweetUsers.filter(
              (each) => each !== action.payload.postedBy._id
            );
          }
          return each;
        });
        // remove retweet from users retweets
        user.reTweets = user.reTweets.filter(
          (each) => each !== action.payload._id
        );
        // remove retweet post from post data
        newData = newData.filter((each) => each._id !== action.payload._id);
      } else {
        users = state.allUser.map((each) => {
          each.likes.filter(
            (each) => each._id != action.payload.retweetData?._id
          );
          each.reTweets.filter((each) => each._id != action.payload._id);
          console.log(each.likes);
          console.log(each.reTweets);
          return each;
        });
        newData = newData.filter((each) => each._id !== action.payload._id);
        newData = newData.filter(
          (each) => each.retweetData?._id !== action.payload._id
        );
      }
      state.postData = [...newData];
      state.loginUser = user;
      state.allUser = [...users];
    },
    setEditPost(state, action) {
      state.postData = state.postData.map((each) =>
        each._id === action.payload._id ? action.payload : each
      );
    },
    setAddTweet(state, action) {
      const post = state.postData.map((each) => {
        if (each._id === action.payload.oldPost.postId) {
          each.reTweetUsers.push(action.payload.oldPost.userId);
        }
        return each;
      });
      state.postData = [action.payload.post, ...post];
    },
    setDeleteTweet(state, action) {
      let post = state.postData.filter((each) => {
        if (each.retweetData && each.postedBy._id === action.payload.userId) {
          return each.retweetData._id !== action.payload.postId;
        } else {
          return each;
        }
      });
      post = post.filter((each) => {
        if (each._id === action.payload.postId) {
          each.reTweetUsers = each.reTweetUsers.filter(
            (each) => each !== action.payload.userId
          );
        }
        return each;
      });
      state.postData = [...post];
    },
    setAddReply(state, action) {
      state.postData = state.postData.map((each) => {
        if (each.id === action.payload.postId) {
          each.replies.unshift(payload);
        }
        return each;
      });
    },
    setDeleteReply(state, action) {
      state.postData = state.postData.map((each) => {
        if (each._id === action.payload.postId) {
          each.replies = each.replies.filter(
            (reply) => reply._id !== action.payload.replyId
          );
        }
        return each;
      });
    },
  },
});

export const userAction = userSlice.actions;
export const postAction = postSlice.actions;

const store = configureStore({
  reducer: { user: userSlice.reducer, post: postSlice.reducer },
});

export default store;

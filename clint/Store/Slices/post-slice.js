import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showReplies: false,
  postData: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setAddPost(state, action) {
      const payload = action.payload;
      state.postData = [payload, ...state.postData];
    },
    // src/components/ HomePage / Post / PostHelperComp / PostDeleteEdit
    setDeletePost(state, action) {
      let newData = state.postData;
      let user = action.payload.loginUser;
      let users = action.payload.allUser;
      let post = action.payload.post;
      if (post.retweetData?._id) {
        newData = state.postData.map((each) => {
          if (each._id === post.retweetData._id) {
            each.reTweetUsers = each.reTweetUsers.filter(
              (each) => each !== post.postedBy._id
            );
          }
          return each;
        });
        newData = newData.filter((each) => each._id !== post._id);
      } else {
        users = users.map((each) => {
          each.likes.filter((each) => each._id != post.retweetData?._id);
          each.reTweets.filter((each) => each._id != post._id);
          return each;
        });
        newData = newData.filter((each) => each._id !== post._id);
        newData = newData.filter((each) => each.retweetData?._id !== post._id);
      }
      state.postData = [...newData];
      action.payload.data.user = user;
      action.payload.data.users = users;
    },

    setDeleteReply(state, action) {
      const payload = action.payload;
      state.postData = state.postData.map((each) => {
        if (each._id === payload.postId) {
          each.replies = each.replies.filter(
            (reply) => reply._id !== payload.replyId
          );
        }
        return each;
      });
    },
    setEditPost(state, action) {
      const payload = action.payload;
      state.postData = state.postData.map((each) =>
        each._id === payload._id ? payload : each
      );
    },
    setPostData(state, action) {
      state.postData = [...action.payload];
    },
    // postAction.setAddTweet({ post, oldPost: { postId, userId } })
    setAddTweet(state, action) {
      const payload = action.payload;
      const post = state.postData.map((each) => {
        if (each._id === payload.oldPost.postId) {
          each.reTweetUsers.push(payload.oldPost.userId);
        }
        return each;
      });
      state.postData = [payload.post, ...post];
    },
    setDeleteTweet(state, action) {
      const payload = action.payload;
      let post = state.postData.filter((each) => {
        if (each.retweetData && each.postedBy._id === payload.userId) {
          return each.retweetData._id !== payload.postId;
        } else {
          return each;
        }
      });
      post = post.filter((each) => {
        if (each._id === payload.postId) {
          each.reTweetUsers = each.reTweetUsers.filter(
            (each) => each !== payload.userId
          );
        }
        return each;
      });
      state.postData = [...post];
    },
    setAddReply(state, action) {
      const payload = action.payload;
      state.postData = state.postData.map((each) => {
        if (each.id === payload.postId) {
          each.replies.unshift(payload);
        }
        return each;
      });
    },
  },
});

export const postAction = postSlice.actions;

export default postSlice;

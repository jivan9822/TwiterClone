import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  loginUser: null,
  showReplies: false,
  allUser: [],
  postData: [],
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_LOGIN_USER': {
      return {
        ...state,
        loginUser: payload,
      };
    }
    case 'SET_ALL_USERS': {
      return {
        ...state,
        allUser: payload,
      };
    }
    case 'SET_POST_DATA': {
      return {
        ...state,
        postData: payload,
      };
    }
    case 'ADD_POST': {
      return {
        ...state,
        postData: [payload, ...state.postData],
      };
    }
    case 'ADD_TWEET': {
      const post = state.postData.map((each) => {
        if (each._id === payload.oldPost.postId) {
          each.reTweetUsers.push(payload.oldPost.userId);
        }
        return each;
      });
      return {
        ...state,
        postData: [payload.post, ...post],
      };
    }
    case 'DELETE_TWEET': {
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
      return {
        ...state,
        postData: post,
      };
    }
    case 'ADD_REPLY': {
      return {
        ...state,
        postData: state.postData.map((each) => {
          if (each.id === payload.postId) {
            each.replies.unshift(payload);
          }
          return each;
        }),
      };
    }
    case 'DELETE_REPLY': {
      return {
        ...state,
        postData: state.postData.map((each) => {
          if (each._id === payload.postId) {
            each.replies = each.replies.filter(
              (reply) => reply._id !== payload.replyId
            );
          }
          return each;
        }),
      };
    }

    case 'DELETE_POST': {
      let newData = state.postData;
      let user = state.loginUser;
      let users = state.allUser;

      if (payload.retweetData?._id) {
        // remove retweet user from original post
        newData = state.postData.map((each) => {
          if (each._id === payload.retweetData._id) {
            each.reTweetUsers = each.reTweetUsers.filter(
              (each) => each !== payload.postedBy._id
            );
          }
          return each;
        });
        // remove retweet from users retweets
        user.reTweets = user.reTweets.filter((each) => each !== payload._id);
        // remove retweet post from post data
        newData = newData.filter((each) => each._id !== payload._id);
      } else {
        console.log('WrongCalled!');
        users = state.allUser.map((each) => {
          each.likes.filter((each) => each._id != payload.retweetData?._id);
          each.reTweets.filter((each) => each._id != payload._id);
          console.log(each.likes);
          console.log(each.reTweets);
          return each;
        });
        newData = newData.filter((each) => each._id !== payload._id);
        newData = newData.filter(
          (each) => each.retweetData?._id !== payload._id
        );
      }
      return {
        ...state,
        postData: newData,
        loginUser: user,
        allUser: users,
      };
    }
    case 'EDIT_POST': {
      return {
        ...state,
        postData: state.postData.map((each) =>
          each._id === payload._id ? payload : each
        ),
      };
    }

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

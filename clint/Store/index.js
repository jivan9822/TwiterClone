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
      return {
        ...state,
        postData: state.postData.filter((each) => each._id !== payload),
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

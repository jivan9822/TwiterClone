import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  loginUser: null,
  showReplies: false,
  onReplyClick: false,
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
    case 'showReply': {
      return {
        ...state,
        showReplies: !state.showReplies,
      };
    }
    case 'reply': {
      return {
        ...state,
        onReplyClick: !state.onReplyClick,
      };
    }
    case 'DELETE_POST': {
      return {
        ...state,
        postData: state.postData.filter((each) => each._id !== payload),
      };
    }
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

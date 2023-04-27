import { createStore } from 'redux';

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
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;

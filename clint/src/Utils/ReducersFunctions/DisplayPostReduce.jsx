export const initialState = {
  showReplies: false,
  onReplyClick: false,
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
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
    default: {
      return state;
    }
  }
};

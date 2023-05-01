import axios from 'axios';
const PROXY = import.meta.env.VITE_PROXY;

export const DeletePost = (postId) => {
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/userPost/deletePost`,
        { postId },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({ type: 'DELETE_POST', payload: postId });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const DeleteReply = (replyId, postId) => {
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/userAction/deleteReply`,
        { replyId },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({
          type: 'DELETE_REPLY',
          payload: { replyId, postId },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

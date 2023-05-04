import axios from 'axios';
import { postAction } from '../../Store';
const PROXY = import.meta.env.VITE_PROXY;

export const DeletePost = (post) => {
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/userPost/deletePost`,
        { postId: post._id },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(postAction.setDeletePost(post));
        // dispatch({ type: 'DELETE_POST', payload: post });
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

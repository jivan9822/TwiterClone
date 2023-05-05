import axios from 'axios';
import { postAction } from '../../Store/Slices/post-slice';
import { userAction } from '../../Store/Slices/User-Slice';

const PROXY = import.meta.env.VITE_PROXY;

export const DeletePost = (post, loginUser, allUser) => {
  const data = {};
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/userPost/deletePost`,
        { postId: post._id },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(postAction.setDeletePost({ post, loginUser, allUser, data }));
        if (data.user && data.users) {
          dispatch(userAction.updateUser(data));
        }
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
        dispatch(postAction.setDeleteReply({ replyId, postId }));
        // dispatch({
        //   type: 'DELETE_REPLY',
        //   payload: { replyId, postId },
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

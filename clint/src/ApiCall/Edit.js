import axios from 'axios';
import { postAction } from '../../Store/Slices/post-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const EditPost = (postId, newPost) => {
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/userPost/editPost`,
        { postId, newPost },
        { withCredentials: true }
      )
      .then((res) => {
        // dispatch({ type: 'EDIT_POST', payload: res.data.post });
        dispatch(postAction.setEditPost(res.data.post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

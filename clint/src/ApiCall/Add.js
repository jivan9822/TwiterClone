import axios from 'axios';
import { postAction } from '../../Store/Slices/post-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const AddPost = (post) => {
  return (dispatch) => {
    axios
      .post(`${PROXY}/userPost/addPost`, { post }, { withCredentials: true })
      .then((res) => {
        dispatch(postAction.setAddPost(res.data.post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

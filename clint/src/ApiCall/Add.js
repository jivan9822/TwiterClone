import axios from 'axios';
import { postAction } from '../../Store';
const PROXY = import.meta.env.VITE_PROXY;

export const AddPost = (post) => {
  return (dispatch) => {
    axios
      .post(`${PROXY}/userPost/addPost`, { post }, { withCredentials: true })
      .then((res) => {
        dispatch(postAction.setAddPost(res.data.post));
        // dispatch({ type: 'ADD_POST', payload: res.data.post });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

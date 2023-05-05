import axios from 'axios';
import { postAction } from '../../Store/Slices/post-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const GetPosts = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/userPost/getAllPost`)
      .then((res) => {
        // dispatch({ type: 'SET_POST_DATA', payload: res.data.posts });
        dispatch(postAction.setPostData(res.data.posts));
      })
      .catch((err) => {
        // dispatch({ type: 'SET_POST_DATA', payload: [] });
        dispatch(postAction.setPostData([]));
        console.log(err);
      });
  };
};

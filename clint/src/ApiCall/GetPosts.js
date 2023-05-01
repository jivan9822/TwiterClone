import axios from 'axios';
const PROXY = import.meta.env.VITE_PROXY;

export const GetPosts = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/userPost/getAllPost`)
      .then((res) => {
        dispatch({ type: 'SET_POST_DATA', payload: res.data.posts });
      })
      .catch((err) => {
        dispatch({ type: 'SET_POST_DATA', payload: [] });
        console.log(err);
      });
  };
};

import axios from 'axios';
const PROXY = import.meta.env.VITE_PROXY;

export const AddPost = (post) => {
  return (dispatch) => {
    axios
      .post(`${PROXY}/userPost/addPost`, { post }, { withCredentials: true })
      .then((res) => {
        dispatch({ type: 'ADD_POST', payload: res.data.post });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

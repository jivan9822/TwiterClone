import axios from 'axios';

export const GetPosts = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:3002/userPost/getAllPost')
      .then((res) => {
        dispatch({ type: 'SET_POST_DATA', payload: res.data.posts });
      })
      .catch((err) => {
        dispatch({ type: 'SET_POST_DATA', payload: [] });
        console.log(err);
      });
  };
};

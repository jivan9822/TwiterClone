import axios from 'axios';

export const AddPost = (post) => {
  return (dispatch) => {
    axios
      .post(
        'http://localhost:3002/userPost/addPost',
        { post },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({ type: 'ADD_POST', payload: res.data.post });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

import axios from 'axios';

export const DeletePost = (postId) => {
  return (dispatch) => {
    axios
      .post(
        'http://localhost:3002/userPost/deletePost',
        { postId },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({ type: 'DELETE_POST', payload: postId });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

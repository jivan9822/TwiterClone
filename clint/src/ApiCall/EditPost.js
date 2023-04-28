import axios from 'axios';

export const EditPost = (postId, newPost) => {
  return (dispatch) => {
    axios
      .post(
        `http://localhost:3002/userPost/editPost`,
        { postId, newPost },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({ type: 'EDIT_POST', payload: res.data.post });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

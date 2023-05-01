import axios from 'axios';
const PROXY = import.meta.env.VITE_PROXY;

export const AddTweet = (postId, userId) => {
  console.log(postId, userId);
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/userTweet/addTweet`,
        {
          postId,
          userId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        const post = res.data.reTweetPost;
        if (post) {
          dispatch({
            type: 'ADD_TWEET',
            payload: { post, oldPost: { postId, userId } },
          });
        } else {
          dispatch({ type: 'DELETE_TWEET', payload: { postId, userId } });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

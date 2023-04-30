import axios from 'axios';

export const AddTweet = (postId, userId) => {
  return (dispatch) => {
    axios
      .post(
        `http://localhost:3002/userTweet/addTweet`,
        {
          postId,
          userId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        const post = res.data.reTweetPost;
        console.log(post);
        dispatch({
          type: 'ADD_TWEET',
          payload: { post, oldPost: { postId, userId } },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

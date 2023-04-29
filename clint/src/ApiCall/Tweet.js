import axios from 'axios';

export const AddTweet = (postId, userId) => {
  return (dispatch) => {
    axios
      .post(
        `http://localhost:3002/userTweet/addTweet`,
        {
          tweetId: postId,
          userId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

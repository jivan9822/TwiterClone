import axios from 'axios';
import { postAction } from '../../Store/Slices/post-slice';
import { userAction } from '../../Store/Slices/user-Slice';
const PROXY = import.meta.env.VITE_PROXY;

export const AddTweet = (postId, userId) => {
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
          dispatch(
            postAction.setAddTweet({ post, oldPost: { postId, userId } })
          );
          dispatch(userAction.addTweetToUser(postId));
        } else {
          // dispatch({ type: 'DELETE_TWEET', payload: { postId, userId } });
          dispatch(postAction.setDeleteTweet({ postId, userId }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

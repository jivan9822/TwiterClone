import axios from 'axios';
import { postAction } from '../../Store/Slices/post-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const onClickHandler = (data) => {
  const { name, reply, postId, userId, setLikesLength, setLikeColor } = data;
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/userAction/${name}`,
        { postId, userId, reply },
        { withCredentials: true }
      )
      .then((res) => {
        if (name === 'reply') {
          // dispatch({ type: 'ADD_REPLY', payload: res.data.reply });
          dispatch(postAction.setAddReply(res.data.reply));
        }
        if (name === 'like') {
          setLikesLength(res.data.post?.likes.length);
          setLikeColor((old) => (old === 'black' ? 'red' : 'black'));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

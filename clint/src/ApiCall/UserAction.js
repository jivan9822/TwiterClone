import axios from 'axios';

export const onClickHandler = (data) => {
  const { name, reply, postId, userId, setLikesLength, setLikeColor } = data;
  return (dispatch) => {
    axios
      .post(
        `http://localhost:3002/userAction/${name}`,
        { postId, userId, reply },
        { withCredentials: true }
      )
      .then((res) => {
        if (name === 'reply') {
          dispatch({ type: 'ADD_REPLY', payload: res.data.reply });
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

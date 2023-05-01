import axios from 'axios';
const PROXY = import.meta.env.VITE_PROXY;

export const GetUser = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/isLogin`, { withCredentials: true })
      .then((user) => {
        const userData = user.data.data.user;
        dispatch({ type: 'SET_LOGIN_USER', payload: userData });
      })
      .catch((err) => {
        dispatch({ type: 'SET_LOGIN_USER', payload: null });
        console.log(err);
      });
  };
};

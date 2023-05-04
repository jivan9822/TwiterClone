import axios from 'axios';
import { userAction } from '../../Store';
const PROXY = import.meta.env.VITE_PROXY;

export const GetUser = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/isLogin`, { withCredentials: true })
      .then((user) => {
        const userData = user.data.data.user;
        // dispatch({ type: 'SET_LOGIN_USER', payload: userData });
        dispatch(userAction.setLoginUser(userData));
      })
      .catch((err) => {
        // dispatch({ type: 'SET_LOGIN_USER', payload: null });
        dispatch(userAction.setLoginUser(null));
        console.log(err);
      });
  };
};

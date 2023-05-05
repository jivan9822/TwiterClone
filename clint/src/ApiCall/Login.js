import axios from 'axios';
import { userAction } from '../../Store/Slices/User-Slice';
const PROXY = import.meta.env.VITE_PROXY;

export const Login = (userName, password) => {
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/user/login`,
        {
          data: { userName, password },
        },
        { withCredentials: true }
      )
      .then((res) => {
        const user = res.data.data.user;
        // dispatch({ type: 'SET_LOGIN_USER', payload: user });
        dispatch(userAction.setLoginUser(user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

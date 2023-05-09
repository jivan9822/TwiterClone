import axios from 'axios';
import { userAction } from '../../Store/Slices/user-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const GetUser = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/isLogin`, { withCredentials: true })
      .then((user) => {
        const userData = user.data.data.user;
        dispatch(userAction.setLoginUser(userData));
      })
      .catch((err) => {
        dispatch(userAction.setLoginUser(null));
        console.log(err);
      });
  };
};

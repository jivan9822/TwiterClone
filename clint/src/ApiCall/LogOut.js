import axios from 'axios';
import { userAction } from '../../Store/Slices/user-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const LogOut = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/logout`, { withCredentials: true })
      .then((res) => {
        dispatch(userAction.setUserLogout());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

import axios from 'axios';
import { userAction } from '../../Store/Slices/user-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const GetAllUsers = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/allusers`)
      .then((user) => {
        const userData = user.data; //.data.data.users;
        dispatch(userAction.setAllUser(userData));
      })
      .catch((err) => {
        dispatch(userAction.setAllUser(null));
        console.log(err);
      });
  };
};

import axios from 'axios';
import { userAction } from '../../Store';
const PROXY = import.meta.env.VITE_PROXY;

export const GetAllUsers = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/allusers`)
      .then((user) => {
        const userData = user.data; //.data.data.users;
        // dispatch({ type: 'SET_ALL_USERS', payload: userData });
        dispatch(userAction.setAllUser(userData));
      })
      .catch((err) => {
        // dispatch({ type: 'SET_ALL_USERS', payload: null });
        dispatch(userAction.setAllUser(null));
        console.log(err);
      });
  };
};

import axios from 'axios';
const PROXY = import.meta.env.VITE_PROXY;

export const LogOut = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/logout`, { withCredentials: true })
      .then((res) => {
        dispatch({ type: 'USER_LOGOUT' });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

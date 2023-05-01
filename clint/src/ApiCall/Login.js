import axios from 'axios';
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
        dispatch({ type: 'SET_LOGIN_USER', payload: user });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

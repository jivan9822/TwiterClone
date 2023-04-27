import axios from 'axios';

export const GetUser = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:3002/user/isLogin', { withCredentials: true })
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

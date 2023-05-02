import axios from 'axios';
const PROXY = import.meta.env.VITE_PROXY;

export const GetAllUsers = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/allusers`)
      .then((user) => {
        const userData = user.data; //.data.data.users;
        dispatch({ type: 'SET_ALL_USERS', payload: userData });
      })
      .catch((err) => {
        dispatch({ type: 'SET_ALL_USERS', payload: null });
        console.log(err);
      });
  };
};

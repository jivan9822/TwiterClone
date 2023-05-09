import axios from 'axios';
import { userAction } from '../../Store/Slices/user-slice';
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
        dispatch(userAction.setLoginUser(user));
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        console.log(errMsg);
        dispatch(userAction.setErrorMsg(errMsg));
      });
  };
};

import HomePage from './componants/HomePage/HomePage';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Utils/Card';
import UserLoginOrRegister from './componants/UserLogin/UserLoginOrRegister';

const App = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.loginUser);
  useEffect(() => {
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

    axios
      .get('http://localhost:3002/userPost/getAllPost')
      .then((res) => {
        dispatch({ type: 'SET_POST_DATA', payload: res.data.posts });
      })
      .catch((err) => {
        dispatch({ type: 'SET_POST_DATA', payload: [] });
        console.log(err);
      });
  }, []);
  return <Card>{isLogin ? <HomePage /> : <UserLoginOrRegister />}</Card>;
};

export default App;

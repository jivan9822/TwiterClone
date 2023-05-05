import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Utils/Card';
import { GetUser } from './ApiCall/GetUser';
import { GetPosts } from './ApiCall/GetPosts';
import { GetAllUsers } from './ApiCall/GetAllUsers';
import HomePage from './components/HomePage/HomePage';
import UserLoginOrRegister from './components/UserLogin/components';

const App = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.loginUser);
  useEffect(() => {
    dispatch(GetUser());
    dispatch(GetPosts());
    dispatch(GetAllUsers());
  }, []);
  return <Card>{isLogin ? <HomePage /> : <UserLoginOrRegister />}</Card>;
};

export default App;

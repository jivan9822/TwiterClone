import HomePage from './componants/HomePage/HomePage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Utils/Card';
import UserLoginOrRegister from './componants/UserLogin/UserLoginOrRegister';
import { GetUser } from './ApiCall/GetUser';
import { GetPosts } from './ApiCall/GetPosts';
import { GetAllUsers } from './ApiCall/GetAllUsers';

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

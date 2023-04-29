import HomePage from './componants/HomePage/HomePage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Utils/Card';
import UserLoginOrRegister from './componants/UserLogin/UserLoginOrRegister';
import { GetUser } from './ApiCall/GetUser';
import { GetPosts } from './ApiCall/GetPosts';

const App = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.loginUser);
  useEffect(() => {
    dispatch(GetUser());
    dispatch(GetPosts());
  }, []);
  return <Card>{isLogin ? <HomePage /> : <UserLoginOrRegister />}</Card>;
};

export default App;

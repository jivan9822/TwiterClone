import HomePage from './componants/HomePage/HomePage';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginPage from './componants/UserLogin/LoginPage';
const App = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:3002/user/isLogin', { withCredentials: true })
      .then((user) => {
        const userData = user.data.data.user;
        setIsLogin(true);
        setUserData(userData);
      })
      .catch((err) => {
        setIsLogin(false);
        console.log(err);
      });
  }, []);
  return (
    <div className='App'>
      {isLogin ? <HomePage /> : <LoginPage onLogin={setIsLogin} />}
    </div>
  );
};

export default App;

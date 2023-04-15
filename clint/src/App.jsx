import HomePage from './componants/HomePage/HomePage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginPage from './componants/UserLogin/LoginPage';
import UserRegistration from './componants/UserLogin/UserRagistration';
import Card from './Utils/Card';
import UserLoginOrRegister from './componants/UserLogin/UserLoginOrRegister';
const App = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost:3002/user/isLogin', { withCredentials: true })
      .then((user) => {
        const userData = user.data.data.user;
        setUserData(userData);
        setIsLogin(true);
      })
      .catch((err) => {
        setIsLogin(false);
        console.log(err);
      });
  }, []);
  return (
    <Card>
      {isLogin ? <HomePage /> : <UserLoginOrRegister onLogin={setIsLogin} />}
    </Card>
  );
};

export default App;

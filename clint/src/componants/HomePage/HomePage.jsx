import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../UserLogin/LoginPage';
import UserRegistration from '../UserLogin/UserRagistration';

function HomePage() {
  const [isLogIn, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:3002/', {
        params: {
          data: 'Jivan',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setIsLogin(false);
      });
  }, []);

  return (
    <Routes>
      <Route path='/' element={isLogIn ? <h1>Home</h1> : <LoginPage />}></Route>
      <Route path='/register' element={<UserRegistration />}></Route>
    </Routes>
  );
}
export default HomePage;

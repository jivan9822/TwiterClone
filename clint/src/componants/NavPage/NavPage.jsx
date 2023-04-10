import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../UserLogin/LoginPage';
import UserRegistration from '../UserLogin/UserRagistration';
import HomePage from '../HomePage/HomePage';

function NavPage() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/register' element={<UserRegistration />}></Route>
    </Routes>
  );
}
export default NavPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './userreglog.module.css';
import axios from 'axios';

function LoginPage() {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onUserInputHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setUserName(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (userName.length > 2 && password.length > 2) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:3002/user/login',
        {
          data: { userName, password },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <h1>Login</h1>
      <div>
        <label htmlFor='name'>Username:</label>
        <input type='text' name='name' onChange={onUserInputHandler} />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' onChange={onUserInputHandler} />
      </div>
      <button
        type='submit'
        disabled={btnDisabled}
        className={btnDisabled ? classes.btnNotAllowed : classes.btn}
      >
        Login
      </button>
      <Link to='/register'>Register?</Link>
    </form>
  );
}

export default LoginPage;

import React, { useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import classes from './userreglog.module.css';
import axios from 'axios';

const initialState = {
  userName: '',
  password: '',
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'userName': {
      return {
        ...state,
        userName: payload,
      };
    }
    case 'password': {
      return {
        ...state,
        password: payload,
      };
    }
    default: {
      throw new Error('Invalid action type');
    }
  }
};
function LoginPage(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const onUserInputHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value.trim() });
    if (state.userName.length > 2 && state.password.length > 2) {
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
          data: { userName: state.userName, password: state.password },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        props.onLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <h1>Login</h1>
      <div>
        <label htmlFor='userName'>Username:</label>
        <input
          type='text'
          name='userName'
          value={state.userName}
          onChange={onUserInputHandler}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          value={state.password}
          onChange={onUserInputHandler}
        />
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

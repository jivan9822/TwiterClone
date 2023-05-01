import React, { useState, useReducer } from 'react';
import classes from './userreglog.module.css';
import axios from 'axios';
const PROXY = import.meta.env.VITE_PROXY;

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
  const onClickHandler = (e) => {
    e.preventDefault();
    props.onRegClick(false);
  };
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
        `${PROXY}/user/login`,
        {
          data: { userName: state.userName, password: state.password },
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
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <h1>Login</h1>
      <div>
        <label className={classes.label} htmlFor='userName'>
          Username:
        </label>
        <input
          type='text'
          name='userName'
          value={state.userName}
          onChange={onUserInputHandler}
        />
      </div>
      <div>
        <label className={classes.label} htmlFor='password'>
          Password:
        </label>
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
      <p style={{ cursor: 'pointer' }} onClick={onClickHandler}>
        Register?
      </p>
    </form>
  );
}

export default LoginPage;

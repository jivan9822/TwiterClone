import React, { useState, useReducer, useRef } from 'react';
import classes from './userreglog.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../../ApiCall/Login';
import DisplayErrorMsg from '../../Utils/DisplayErrorMsg';
import { userAction } from '../../../Store/Slices/User-Slice';

function LoginPage(props) {
  const dispatch = useDispatch();
  const ErrorMsg = useSelector((state) => state.user.errorMsg);
  console.log(ErrorMsg);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setUserPass] = useState('');
  const onClickHandler = (e) => {
    e.preventDefault();
    props.onRegClick(false);
  };
  const onCloseHandler = (e) => {
    e.preventDefault();
    dispatch(userAction.setErrorMsg(null));
  };
  const onUserInputHandler = (e) => {
    const { name, value } = e.target;
    name === 'password' ? setUserPass(value) : setUserName(value);
    if (userName.length > 2 && password.length > 2) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(Login(userName, password));
  };
  return (
    <>
      {ErrorMsg === null ? (
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <h1>Login</h1>
          <div>
            <label className={classes.label} htmlFor='userName'>
              Username:
            </label>
            <input
              type='text'
              name='userName'
              value={userName}
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
              value={password}
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
      ) : (
        <DisplayErrorMsg text={ErrorMsg} onClose={onCloseHandler} />
      )}
    </>
  );
}

export default LoginPage;

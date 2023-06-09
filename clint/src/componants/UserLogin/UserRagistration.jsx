import { useRef, useState } from 'react';
import classes from './userreglog.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

let pass, confPass;
const isValidInputs = ({ password, confirmPassword }) => {
  if (password !== confirmPassword) {
    return false;
  }
  return true;
};

const UserRegistration = (props) => {
  const [userInputs, setUserInputs] = useState({
    fname: '',
    lname: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const confirmPassRef = useRef(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasLoginSuccess, setHasLoginSuccess] = useState(false);

  const onUserInputHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      pass = value;
    }
    if (name === 'confirmPassword') {
      confPass = value;
    }
    setUserInputs((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
    if (pass && confPass && pass === confPass) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    if (isValidInputs(userInputs)) {
      console.log('Valid');
      axios
        .post('http://localhost:3002/user/registration', userInputs)
        .then((res) => {
          console.log(res);
          setHasLoginSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          const message = err.response.data.message;
          const match = /\{.*\}/.exec(message);
          const content = match ? match[0] : null;
          console.log(content);

          setHasError(`${content} already exists! Please try different`);
        });
    } else {
      alert('Confirm Password is not same with password!');
      confirmPassRef.current.focus();
    }
    setUserInputs({
      fname: '',
      lname: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };
  return (
    <div onClick={() => setHasError(false)}>
      <form onSubmit={onFormSubmitHandler}>
        <div className={classes['form-group']}>
          <label htmlFor='fname'>FirstName: </label>
          <input
            type='text'
            name='fname'
            value={userInputs.fname}
            onChange={onUserInputHandler}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='lname'>LastName: </label>
          <input
            type='text'
            name='lname'
            value={userInputs.lname}
            onChange={onUserInputHandler}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='userName'>UserName: </label>
          <input
            type='text'
            name='userName'
            value={userInputs.userName}
            onChange={onUserInputHandler}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='email'>Email Id: </label>
          <input
            type='email'
            name='email'
            value={userInputs.email}
            onChange={onUserInputHandler}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            name='password'
            value={userInputs.password}
            onChange={onUserInputHandler}
            required
          />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='confirmPassword'>Confirm Password: </label>
          <input
            type='password'
            name='confirmPassword'
            value={userInputs.confirmPassword}
            onChange={onUserInputHandler}
            ref={confirmPassRef}
            required
          />
        </div>
        <button
          type='submit'
          disabled={btnDisabled}
          className={btnDisabled ? classes.btnNotAllowed : classes.btn}
        >
          Register
        </button>
        <Link to='/'>Already Register?</Link>
      </form>
      {hasError && (
        <div className={classes.backdropMessage}>
          <p>{hasError}</p>
        </div>
      )}
      {hasLoginSuccess && (
        <div className={classes.backdropMessage}>
          <div className={classes.LoginSuccess}>
            <p>Registration Success</p>
            <Link to='/'>Click to Login!</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;

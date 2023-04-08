import { useRef, useState } from 'react';
import classes from './userreglog.module.css';
import { Link } from 'react-router-dom';

let pass, confPass;
const isValidInputs = ({ password, confirmPassword }) => {
  if (password !== confirmPassword) {
    return false;
  }
  return true;
};

const UserRegistration = (props) => {
  const [userInputs, setUserInputs] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const confirmPassRef = useRef(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

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
    } else {
      alert('Confirm Password is not same with password!');
      confirmPassRef.current.focus();
    }
    setUserInputs({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };
  return (
    <form onSubmit={onFormSubmitHandler}>
      <div className={classes['form-group']}>
        <label htmlFor='name'>UserName: </label>
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
  );
};

export default UserRegistration;

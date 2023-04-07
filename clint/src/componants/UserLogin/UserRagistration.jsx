import classes from './userreglog.module.css';
import { Link } from 'react-router-dom';

const UserRegistration = (props) => {
  return (
    <form>
      <div className={classes['form-group']}>
        <label htmlFor='name'>UserName: </label>
        <input type='text' name='name' />
      </div>
      <div className={classes['form-group']}>
        <label htmlFor='email'>Email Id: </label>
        <input type='text' name='email' />
      </div>
      <div className={classes['form-group']}>
        <label htmlFor='password'>Password: </label>
        <input type='text' name='password' />
      </div>
      <div className={classes['form-group']}>
        <label htmlFor='confirmPassword'>Confirm Password: </label>
        <input type='text' name='confirmPassword' />
      </div>
      <button type='submit'>Register</button>
      <Link to='/'>Already Register?</Link>
    </form>
  );
};

export default UserRegistration;

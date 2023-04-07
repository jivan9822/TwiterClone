import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <form>
      <h1>Login</h1>
      <div>
        <label htmlFor='name'>Username:</label>
        <input type='text' name='name' />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' />
      </div>
      <button type='submit'>Login</button>
      <Link to='/register'>Register?</Link>
    </form>
  );
}

export default LoginPage;

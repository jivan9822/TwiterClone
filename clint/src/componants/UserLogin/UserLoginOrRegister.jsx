import { useState } from 'react';
import LoginPage from './LoginPage';
import UserRegistration from './UserRagistration';

const UserLoginOrRegister = (props) => {
  const [isRegister, setIsRegister] = useState(true);
  return (
    <div>
      {isRegister ? (
        <LoginPage onRegClick={setIsRegister} onLogin={props.onLogin} />
      ) : (
        <UserRegistration onLoginClick={setIsRegister} />
      )}
    </div>
  );
};
export default UserLoginOrRegister;

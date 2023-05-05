import { useState } from 'react';
import LoginPage from './LoginPage';
import UserRegistration from './UserRagistration';

const UserLoginOrRegister = () => {
  const [isRegister, setIsRegister] = useState(true);
  return (
    <div>
      {isRegister ? (
        <LoginPage onRegClick={setIsRegister} />
      ) : (
        <UserRegistration onLoginClick={setIsRegister} />
      )}
    </div>
  );
};
export default UserLoginOrRegister;

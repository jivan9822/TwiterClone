import {
  FaHome,
  FaTwitter,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import classes from './home.module.css';
import PostForm from './Post/PostForm';
import { useState } from 'react';

function HomePage(props) {
  const [isHome, setIsHome] = useState(true);
  return (
    <div className={classes.container}>
      <div className={classes.Icons}>
        <FaTwitter
          onClick={() => setIsHome(true)}
          className={classes.icon}
          style={{ color: 'blue' }}
          size={40}
        />
        <FaHome
          onClick={() => setIsHome(true)}
          className={classes.icon}
          size={40}
        />
        <FaSearch
          onClick={() => setIsHome(false)}
          className={classes.icon}
          size={40}
        />
        <FaBell className={classes.icon} size={40} />
        <FaEnvelope className={classes.icon} size={40} />
        <FaUser className={classes.icon} size={40} />
        <FaSignOutAlt className={classes.icon} size={40} />
      </div>
      <div>
        {isHome ? <PostForm user={props.user} /> : <h1>Work in progress!</h1>}
      </div>
    </div>
  );
}
export default HomePage;

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

function HomePageHelper() {
  return (
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
  );
}
export default HomePageHelper;

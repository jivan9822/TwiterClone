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

const HomePageIcon = ({ setIsHome }) => {
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
      <FaBell
        onClick={() => setIsHome(false)}
        className={classes.icon}
        size={40}
      />
      <FaEnvelope
        onClick={() => setIsHome(false)}
        className={classes.icon}
        size={40}
      />
      <FaUser
        onClick={() => setIsHome(false)}
        className={classes.icon}
        size={40}
      />
      <FaSignOutAlt
        onClick={() => setIsHome(false)}
        className={classes.icon}
        size={40}
      />
    </div>
  );
};
export default HomePageIcon;

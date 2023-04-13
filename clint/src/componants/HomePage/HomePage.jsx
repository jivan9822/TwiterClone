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
function HomePage() {
  return (
    <div className={classes.container}>
      <div className={classes.Icons}>
        <FaTwitter
          className={classes.icon}
          style={{ color: 'blue' }}
          size={40}
        />
        <FaHome className={classes.icon} size={40} />
        <FaSearch className={classes.icon} size={40} />
        <FaBell className={classes.icon} size={40} />
        <FaEnvelope className={classes.icon} size={40} />
        <FaUser className={classes.icon} size={40} />
        <FaSignOutAlt className={classes.icon} size={40} />
      </div>
      <div>
        <PostForm />
      </div>
    </div>
  );
}
export default HomePage;

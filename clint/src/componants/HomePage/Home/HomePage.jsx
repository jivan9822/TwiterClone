import HomePageHelper from './HomePageHelper';
import classes from './home.module.css';
import PostForm from '../Post/PostForm';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

function HomePage() {
  const [isHome, setIsHome] = useState(true);

  return (
    <div className={classes.container}>
      <FaUser className={classes.faUser} />
      {/* <HomePageHelper /> */}
      <div>{isHome ? <PostForm /> : <h1>Work in progress!</h1>}</div>
    </div>
  );
}
export default HomePage;

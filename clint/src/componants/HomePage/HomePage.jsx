import PostForm from './Post/PostForm';
import { useEffect, useState } from 'react';
import classes from './home.module.css';
import { FaUser } from 'react-icons/fa';
import HomePageIcon from './HomePageIcon';

function HomePage() {
  const [isHome, setIsHome] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const onClickHandler = (e) => {
    e.preventDefault();
    showIcons && setShowIcons((old) => !old);
  };
  const setIcons = (data) => {
    setIsHome(data);
    setShowIcons(false);
  };
  return (
    <div className={classes.container}>
      {showIcons && <HomePageIcon setIsHome={setIcons} />}
      <FaUser onClick={() => setShowIcons(true)} />
      <div onClick={onClickHandler}>
        {isHome ? <PostForm /> : <h1>Work in progress!</h1>}
      </div>
    </div>
  );
}
export default HomePage;

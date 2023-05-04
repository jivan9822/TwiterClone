import classes from './display.module.css';
import DisplayPostHelper from './DisplayPostHelper';
import { useSelector } from 'react-redux';

const DisplayPost = () => {
  const posts = useSelector((state) => state.post.postData);

  return (
    <div className={classes.container2}>
      {posts.map((post) => (
        <DisplayPostHelper key={post._id} post={post} />
      ))}
    </div>
  );
};

export default DisplayPost;

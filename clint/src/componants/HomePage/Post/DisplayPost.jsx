import classes from './display.module.css';
import DisplayPostHelper from './DisplayPostHelper';

const DisplayPost = ({ posts }) => {
  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <DisplayPostHelper key={post._id} post={post} />
      ))}
    </div>
  );
};

export default DisplayPost;

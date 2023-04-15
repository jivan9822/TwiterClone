import classes from './display.module.css';

const DisplayPost = ({ posts }) => {
  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <div className={classes.userPost} key={post._id}>
          <img src={post.postedBy.profilePic} />
          <h3>{post.content}</h3>
        </div>
      ))}
    </div>
  );
};

export default DisplayPost;

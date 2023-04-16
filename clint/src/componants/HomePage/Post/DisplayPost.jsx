import classes from './display.module.css';
import moment from 'moment';

const DisplayPost = ({ posts }) => {
  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <div className={classes.userPost} key={post._id}>
          <img src={post.postedBy.profilePic} />
          <h3>{post.content}</h3>
          <p>{moment(post.createdAt).fromNow()}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayPost;

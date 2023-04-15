import classes from './postform.module.css';
const PostForm = (props) => {
  return (
    <div className={classes.postForm}>
      <div className={classes.container}>
        <img src='images/profilePic.jpg' className={classes.img} />
        <textarea autoFocus />
      </div>
      <button>POST</button>
    </div>
  );
};

export default PostForm;

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './postform.module.css';
import DisplayPost from './DisplayPost';
import { AddPost } from '../../../ApiCall/Add';

const PostForm = () => {
  const user = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const postRef = useRef();
  const onEnterHandler = (e) => {
    if (e.key === 'Enter') submitHandler(e);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const post = postRef.current.value;
    if (post.length > 1) {
      dispatch(AddPost(post));
    }
    postRef.current.value = '';
  };
  return (
    <div className={classes.postFormContainer}>
      <h4 className={classes.welcome}>Welcome-{user?.fname}</h4>
      <div className={classes.postForm}>
        <div className={classes.container}>
          <img src={user.profilePic} />
          <textarea
            className={classes.textarea}
            autoFocus
            ref={postRef}
            placeholder='Write your post here'
            onKeyUp={onEnterHandler}
          />
        </div>
        <button onClick={submitHandler}>Tweet</button>
      </div>
      <DisplayPost />
    </div>
  );
};

export default PostForm;

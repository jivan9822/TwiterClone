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
    <div>
      <h1>Welcome-{user?.fname}</h1>
      <div className={classes.postForm}>
        <div className={classes.container}>
          <img src='images/profilePic.jpg' className={classes.img} />
          <textarea
            className={classes.textarea}
            autoFocus
            ref={postRef}
            placeholder='Write your post here'
            onKeyUp={onEnterHandler}
          />
        </div>
        <button onClick={submitHandler}>ADD-POST</button>
      </div>
      <DisplayPost />
    </div>
  );
};

export default PostForm;

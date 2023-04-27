import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './postform.module.css';
import axios from 'axios';
import DisplayPost from './DisplayPost';

const PostForm = () => {
  const user = useSelector((state) => state.loginUser);
  const posts = useSelector((state) => state.postData);
  const dispatch = useDispatch();
  const postRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const post = postRef.current.value;
    axios
      .post(
        'http://localhost:3002/userPost/addPost',
        { post },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({ type: 'ADD_POST', payload: res.data.post });
      })
      .catch((err) => {
        console.log(err);
      });
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
          />
        </div>
        <button onClick={submitHandler}>ADD-POST</button>
      </div>
      <DisplayPost />
    </div>
  );
};

export default PostForm;

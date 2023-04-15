import { useRef } from 'react';
import classes from './postform.module.css';
import axios from 'axios';

const PostForm = (props) => {
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    postRef.current.value = '';
  };
  return (
    <div className={classes.postForm}>
      <div className={classes.container}>
        <img src='images/profilePic.jpg' className={classes.img} />
        <textarea autoFocus ref={postRef} />
      </div>
      <button onClick={submitHandler}>ADD-POST</button>
    </div>
  );
};

export default PostForm;

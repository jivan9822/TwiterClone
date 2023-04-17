import { useRef, useContext, useState } from 'react';
import classes from './postform.module.css';
import axios from 'axios';
import DisplayPost from './DisplayPost';
import postContext from '../../../Context/post-context';

const PostForm = (props) => {
  const { posts } = useContext(postContext);
  const [userPosts, setUserPosts] = useState(false);
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
        setUserPosts((old) => !old);
        posts.push(res.data.post);
        posts.reverse();
      })
      .catch((err) => {
        console.log(err);
      });
    postRef.current.value = '';
  };
  return (
    <div>
      <h1>Welcome-{props.user.fname}</h1>
      <div className={classes.postForm}>
        <div className={classes.container}>
          <img src='images/profilePic.jpg' className={classes.img} />
          <textarea autoFocus ref={postRef} />
        </div>
        <button onClick={submitHandler}>ADD-POST</button>
      </div>
      <DisplayPost posts={posts} />
    </div>
  );
};

export default PostForm;

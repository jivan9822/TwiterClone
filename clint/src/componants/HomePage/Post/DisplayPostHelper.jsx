import moment from 'moment';
import classes from './display.module.css';
import axios from 'axios';
import { FaFacebookMessenger, FaRetweet, FaHeart } from 'react-icons/fa';
import { useContext, useState } from 'react';
import userContext from '../../../Context/user-context';
import ReplyPostForm from '../ReplyPost/ReplyPostForm';
import DisplayReplies from '../ReplyPost/DisplayReplies';

const DisplayPostHelper = ({ post }) => {
  const user = useContext(userContext);
  const postId = post._id;
  const initialColor = post.likes && post.likes.includes(user.user._id);
  const [likeColor, setLikeColor] = useState(initialColor ? 'red' : 'black');
  const [likesLength, setLikesLength] = useState(post.likes.length);
  const [showReplies, setShowReplies] = useState(false);
  const [onReplyClick, setReplyClick] = useState(false);

  const onClickHandler = (e, name, reply) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3002/userAction/${name}`,
        {
          postId,
          userId: user.user._id,
          reply,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (name === 'like') {
          setLikesLength(res.data.post?.likes.length);
          setLikeColor((old) => (old === 'black' ? 'red' : 'black'));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    user.handleRender();
  };

  return (
    <div className={classes.userPost}>
      <div className={classes.postMainDiv}>
        <img src={post.postedBy.profilePic} />
        <div className={classes.otherContent}>
          <div>
            <span>
              <b>
                {post.postedBy.fname}
                {post.postedBy.lname}
              </b>
            </span>{' '}
            <span>
              @{post.postedBy.userName} --{moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div>
            <h3>{post.content}</h3>
          </div>
          <div className={classes.iconDiv}>
            <span className={classes.spanDiv}>
              <FaFacebookMessenger
                onClick={(e) => {
                  setReplyClick((old) => !old);
                }}
                className={classes.icon}
              />
              <span
                onClick={() => setShowReplies((old) => !old)}
                style={{ cursor: 'pointer' }}
              >
                {post.replies.length || ''}
              </span>
            </span>
            <span className={classes.spanDiv}>
              <FaRetweet
                onClick={(e) => onClickHandler(e, 'retweet')}
                className={classes.icon}
              />
              0
            </span>
            <span className={classes.spanDiv}>
              <FaHeart
                onClick={(e) => onClickHandler(e, 'like')}
                className={classes.icon}
                style={{ color: likeColor }}
              />
              {likesLength}
            </span>
          </div>
        </div>
      </div>
      {onReplyClick && <ReplyPostForm onClick={onClickHandler} />}
      {showReplies && <DisplayReplies replies={post.replies} />}
    </div>
  );
};
export default DisplayPostHelper;

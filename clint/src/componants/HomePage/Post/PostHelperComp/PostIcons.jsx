import { useState } from 'react';
import classes from '../display.module.css';
import { FaFacebookMessenger, FaRetweet, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { onClickHandler } from './../../../../ApiCall/UserAction';
import { AddTweet } from '../../../../ApiCall/Tweet';

const PostIcons = (props) => {
  const userId = useSelector((state) => state.loginUser._id);
  const dispatch = useDispatch();
  const postId = props.post.retweetData
    ? props.post.retweetData._id
    : props.post._id;
  const initialColor = props.post.likes?.includes(userId);
  const [likeColor, setLikeColor] = useState(initialColor ? 'red' : 'black');
  const [likesLength, setLikesLength] = useState(props.post?.likes?.length);
  const onClickAction = (e, name, reply, postId) => {
    e.preventDefault();
    dispatch(
      onClickHandler({
        name,
        reply,
        postId,
        userId,
        setLikeColor,
        setLikesLength,
      })
    );
  };
  const onTweetClick = (e, postId) => {
    e.preventDefault();
    dispatch(AddTweet(postId, userId));
  };
  return (
    <div className={classes.iconDiv}>
      <span className={classes.spanDiv}>
        <FaFacebookMessenger
          onClick={(e) => {
            props.setReplyClick((old) => !old);
            props.setShowReplyClick(false);
          }}
          className={classes.icon}
        />
        <span
          onClick={() => {
            props.setShowReplyClick((old) => !old);
            props.setReplyClick(false);
          }}
          style={{ cursor: 'pointer' }}
        >
          {props.post.replies?.length || ''}
        </span>
      </span>
      <span className={classes.spanDiv}>
        <FaRetweet
          onClick={(e) => onTweetClick(e, postId)}
          className={classes.icon}
        />
        0
      </span>
      <span className={classes.spanDiv}>
        <FaHeart
          onClick={(e) => onClickAction(e, 'like', null, props.post._id)}
          className={classes.icon}
          style={{ color: likeColor }}
        />
        {likesLength}
      </span>
    </div>
  );
};
export default PostIcons;

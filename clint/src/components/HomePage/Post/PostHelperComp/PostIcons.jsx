import { useState } from 'react';
import classes from '../display.module.css';
import { FaFacebookMessenger, FaRetweet, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { onClickHandler } from './../../../../ApiCall/UserAction';
import { AddTweet } from '../../../../ApiCall/Tweet';

const PostIcons = (props) => {
  const userId = useSelector((state) => state.user.loginUser._id);
  const dispatch = useDispatch();
  const postId = props.post.retweetData
    ? props.post.retweetData._id
    : props.post._id;
  const initialColor = props.post.likes?.includes(userId);
  const [likeColor, setLikeColor] = useState(initialColor ? 'red' : 'black');
  const [likesLength, setLikesLength] = useState(props.post?.likes?.length);
  const [show, setShow] = useState('ShowReply');

  const onClickAction = (e, name, reply, Id) => {
    e.preventDefault();
    dispatch(
      onClickHandler({
        name,
        reply,
        postId: Id,
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
      <span className={classes.spanDivReply}>
        <FaFacebookMessenger
          onClick={(e) => {
            props.setReplyClick((old) => !old);
            props.setShowReplyClick(false);
            setShow('ShowReply');
          }}
          className={classes.icon}
        />
        <span>{props.post.replies?.length || 0}</span>
      </span>
      <span
        className={classes.spanDivTweet}
        style={{ color: props.tweetColor }}
      >
        <FaRetweet
          onClick={(e) => onTweetClick(e, postId)}
          className={classes.icon}
          style={{ color: props.tweetColor }}
        />
        {props.retweetLength}
      </span>
      <span className={classes.spanDivLike}>
        <FaHeart
          onClick={(e) => onClickAction(e, 'like', null, props.post._id)}
          className={classes.icon}
          style={{ color: likeColor }}
        />
        {likesLength}
      </span>
      {props.post.replies?.length > 0 && (
        <span
          className={classes.spanDivShowReply}
          onClick={() => {
            props.setShowReplyClick((old) => !old);
            props.setReplyClick(false);
            setShow((old) => (old === 'ShowReply' ? 'HideReply' : 'ShowReply'));
          }}
          style={{ cursor: 'pointer' }}
        >
          {show}
        </span>
      )}
    </div>
  );
};
export default PostIcons;

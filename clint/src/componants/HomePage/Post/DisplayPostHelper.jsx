import moment from 'moment';
import classes from './display.module.css';
import axios from 'axios';
import { DeletePost } from '../../../ApiCall/Delete';
import {
  FaFacebookMessenger,
  FaRetweet,
  FaHeart,
  FaTrash,
  FaEdit,
} from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import ReplyPostForm from '../ReplyPost/ReplyPostForm';
import DisplayReplies from '../ReplyPost/DisplayReplies';
import { useDispatch, useSelector } from 'react-redux';
import { EditPost } from '../../../ApiCall/Edit';

const DisplayPostHelper = ({ post }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const flag = post.postedBy._id === state.loginUser._id;

  const initialColor = post.likes?.includes(state.loginUser._id);
  const [likeColor, setLikeColor] = useState(initialColor ? 'red' : 'black');
  const [likesLength, setLikesLength] = useState(post?.likes?.length);
  const [onReplyClick, setReplyClick] = useState(false);
  const contentRef = useRef();
  const [isEditable, setEditable] = useState(false);

  const deletePostHandler = (e) => {
    e.preventDefault();
    dispatch(DeletePost(post._id));
  };

  const onClickHandler = (e, name, reply) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3002/userAction/${name}`,
        {
          postId: post._id,
          userId: state.loginUser._id,
          reply,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (name === 'reply') {
          dispatch({ type: 'ADD_REPLY', payload: res.data.reply });
        }
        if (name === 'like') {
          setLikesLength(res.data.post?.likes.length);
          setLikeColor((old) => (old === 'black' ? 'red' : 'black'));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      editHandler(e);
    }
  };
  const editHandler = (e) => {
    const text = contentRef.current.innerText.trim();
    dispatch(EditPost(post._id, text));
    setEditable(false);
  };
  useEffect(() => {
    if (isEditable && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isEditable]);
  return (
    <div className={classes.userPost}>
      <div className={classes.postMainDiv}>
        <div className={classes.imageOthers}>
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
              <h3
                ref={contentRef}
                contentEditable={isEditable}
                onBlur={editHandler}
                onKeyUp={onEnter}
                suppressContentEditableWarning
              >
                {post.content}
              </h3>
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
                  onClick={() => {
                    dispatch({ type: 'showReply' });
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {post.replies?.length || ''}
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
        {flag && (
          <div className={classes.editDeleteBtn}>
            <FaTrash
              fill='black'
              className={classes.delBtn}
              onClick={deletePostHandler}
            />
            <FaEdit
              fill='black'
              className={classes.edtBtn}
              onClick={() => setEditable(true)}
            />
          </div>
        )}
      </div>
      {onReplyClick && <ReplyPostForm onClick={onClickHandler} />}
      {state.showReplies && <DisplayReplies replies={post.replies} />}
    </div>
  );
};
export default DisplayPostHelper;

import moment from 'moment';
import classes from './display.module.css';
import axios from 'axios';
import { FaFacebookMessenger, FaRetweet, FaHeart } from 'react-icons/fa';
import { useReducer, useState } from 'react';
import ReplyPostForm from '../ReplyPost/ReplyPostForm';
import DisplayReplies from '../ReplyPost/DisplayReplies';
import { useUserData } from '../../../CustomHooks/UserAndPostData';
import {
  initialState,
  reducer,
} from '../../../Utils/ReducersFunctions/DisplayPostReduce';

const DisplayPostHelper = ({ post }) => {
  const { user, initialColor, allPost } = useUserData(post); // Custom Hook
  const [state, dispatch] = useReducer(reducer, initialState);
  const postId = post._id;
  const [likeColor, setLikeColor] = useState(initialColor ? 'red' : 'black');
  const [likesLength, setLikesLength] = useState(post?.likes?.length);

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
                  dispatch({ type: 'reply' });
                }}
                className={classes.icon}
              />
              <span
                onClick={() => {
                  dispatch({ type: 'showReply' });
                }}
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
      {state.onReplyClick && <ReplyPostForm onClick={onClickHandler} />}
      {state.showReplies && <DisplayReplies replies={post.replies} />}
    </div>
  );
};
export default DisplayPostHelper;

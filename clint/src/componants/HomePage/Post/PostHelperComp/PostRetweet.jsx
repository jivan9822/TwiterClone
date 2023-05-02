import moment from 'moment';
import classes from '../display.module.css';
import { useState } from 'react';
import DisplayContent from '../../../../Utils/DisplayContent';

const PostRetweet = (props) => {
  let post = props.post.retweetData.content;
  post = post.length > 100 ? post.substring(0, 100) + '...' : post;

  const reData = props.post.retweetData;
  const data = props.post;
  const [showContent, setShowContent] = useState(false);
  const handleClick = () => {
    setShowContent(true);
  };

  const handleClose = () => {
    setShowContent(false);
  };
  return (
    <>
      <p className={classes.reTweetPara}>
        Retweeted by @
        {data.postedBy.userName +
          ' ' +
          data.postedBy.fname +
          ' ' +
          data.postedBy.lname}
        --
        {moment(props.post.createdAt).fromNow()}
      </p>
      <div className={classes.imageOthers}>
        <img src={reData.postedBy.profilePic} />
        <div>
          <span>
            <b>{reData.postedBy.fname + ' ' + reData.postedBy.lname}</b>
          </span>{' '}
          <span>
            @{reData.postedBy.userName} --
            {moment(reData.createdAt).fromNow()}
          </span>
          <p
            onClick={handleClick}
            style={{ fontFamily: 'Sono', fontSize: '16px' }}
            ref={props.contentRef}
            contentEditable={props.isEditable}
            onBlur={props.editHandler}
            onKeyUp={props.onEnter}
            suppressContentEditableWarning
          >
            {post}
          </p>
          {showContent && (
            <DisplayContent
              text={props.post.retweetData.content}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default PostRetweet;

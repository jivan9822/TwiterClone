import moment from 'moment';
import classes from '../display.module.css';
import { useState } from 'react';
import DisplayContent from '../../../../Utils/DisplayContent';

const PostHeader = (props) => {
  const post =
    props.post.content.length > 100
      ? props.post.content.substring(0, 100) + '...'
      : props.post.content;
  const [showContent, setShowContent] = useState(false);
  const handleClick = () => {
    setShowContent(true);
  };

  const handleClose = () => {
    setShowContent(false);
  };
  return (
    <div className={classes.imageOthers}>
      <img src={props.post.postedBy.profilePic} />
      <div>
        <span>
          <b>
            {props.post.postedBy.fname}
            {props.post.postedBy.lname}
          </b>
        </span>{' '}
        <span>
          @{props.post.postedBy.userName} --
          {moment(props.post.createdAt).fromNow()}
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
          <DisplayContent text={props.post.content} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default PostHeader;

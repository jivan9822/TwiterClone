import moment from 'moment';
import classes from '../display.module.css';

const PostHeader = (props) => {
  const post =
    props.post.content.length > 100
      ? props.post.content.substring(0, 100) + '...'
      : props.post.content;
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
          style={{ fontFamily: 'Sono' }}
          ref={props.contentRef}
          contentEditable={props.isEditable}
          onBlur={props.editHandler}
          onKeyUp={props.onEnter}
          suppressContentEditableWarning
        >
          {post}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;

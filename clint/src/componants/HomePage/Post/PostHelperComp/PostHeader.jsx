import moment from 'moment';
import classes from '../display.module.css';

const PostHeader = (props) => {
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
        <h3
          ref={props.contentRef}
          contentEditable={props.isEditable}
          onBlur={props.editHandler}
          onKeyUp={props.onEnter}
          suppressContentEditableWarning
        >
          {props.post.content}
        </h3>
      </div>
    </div>
  );
};

export default PostHeader;

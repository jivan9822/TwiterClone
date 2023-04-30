import moment from 'moment';
import classes from '../display.module.css';

const PostRetweet = (props) => {
  const reData = props.post.retweetData;
  const data = props.post;
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
          <h3
            ref={props.contentRef}
            contentEditable={props.isEditable}
            onBlur={props.editHandler}
            onKeyUp={props.onEnter}
            suppressContentEditableWarning
          >
            {props.post.retweetData.content}
          </h3>
        </div>
      </div>
    </>
  );
};
export default PostRetweet;

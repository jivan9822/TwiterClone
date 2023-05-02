import moment from 'moment';
import classes from '../display.module.css';

const PostRetweet = (props) => {
  let post = props.post.retweetData.content;
  post = post.length > 100 ? post.substring(0, 100) + '...' : post;

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
    </>
  );
};
export default PostRetweet;

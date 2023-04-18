import moment from 'moment';
import classes from './replypost.module.css';

const DisplayReplyHelper = ({ reply }) => {
  return (
    <div className={classes.postMainDiv}>
      <img src={reply.userId.profilePic} />
      <div className={classes.otherContent}>
        <div>
          <span>
            <b>
              {reply.userId.fname}
              {reply.userId.lname}
            </b>
          </span>{' '}
          <span>
            @{reply.userId.userName} --{moment(reply.createdAt).fromNow()}
          </span>
        </div>
        <div>
          <h3>{reply.reply}</h3>
        </div>
      </div>
    </div>
  );
};
export default DisplayReplyHelper;

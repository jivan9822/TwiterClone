import moment from 'moment';
import classes from './replypost.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteReply } from '../../../ApiCall/Delete';

const DisplayReplyHelper = ({ reply }) => {
  const user = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const flag = reply.userId._id === user._id;
  const deleteReplyHandler = (e) => {
    e.preventDefault();
    dispatch(DeleteReply(reply._id, reply.postId._id || reply.postId));
  };
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
      <div>
        {flag && (
          <div className={classes.editDeleteBtn}>
            <FaTrash
              fill='black'
              className={classes.delBtn}
              onClick={deleteReplyHandler}
            />
            <FaEdit
              fill='black'
              className={classes.edtBtn}
              // onClick={() => setEditable(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default DisplayReplyHelper;

import moment from 'moment';
import classes from './replypost.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteReply } from '../../../ApiCall/Delete';
import DisplayContent from '../../../Utils/DisplayContent';
import { useState } from 'react';

const DisplayReplyHelper = ({ reply }) => {
  const user = useSelector((state) => state.loginUser);
  const replyText =
    reply.reply.length > 100
      ? reply.reply.substring(0, 100) + '...'
      : reply.reply;

  const dispatch = useDispatch();
  const flag = reply.userId._id === user._id;
  const [showContent, setShowContent] = useState(false);
  const handleClick = () => {
    setShowContent(true);
  };

  const handleClose = () => {
    setShowContent(false);
  };
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
          <p onClick={handleClick}>{replyText}</p>
          {showContent && (
            <DisplayContent text={reply.reply} onClose={handleClose} />
          )}
        </div>
      </div>
      <div>
        {flag && (
          <div className={classes.editDeleteBtn}>
            <FaTrash
              fill='#646464'
              className={classes.delBtn}
              onClick={deleteReplyHandler}
            />
            <FaEdit fill='#646464' className={classes.edtBtn} />
          </div>
        )}
      </div>
    </div>
  );
};
export default DisplayReplyHelper;

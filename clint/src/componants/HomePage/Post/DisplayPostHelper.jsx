import classes from './display.module.css';
import { useEffect, useRef, useState } from 'react';
import ReplyPostForm from '../ReplyPost/ReplyPostForm';
import DisplayReplies from '../ReplyPost/DisplayReplies';
import { useDispatch, useSelector } from 'react-redux';
import { EditPost } from '../../../ApiCall/Edit';
import PostHeader from './PostHelperComp/PostHeader';
import PostIcons from './PostHelperComp/PostIcons';
import PostDeleteEdit from './PostHelperComp/PostDeleteEdit';

const DisplayPostHelper = ({ post }) => {
  const userId = useSelector((state) => state.loginUser._id);
  const dispatch = useDispatch();
  const flag = post.postedBy._id === userId;

  const [onReplyClick, setReplyClick] = useState(false);
  const [onShowReplyClick, setShowReplyClick] = useState(false);
  const contentRef = useRef();
  const [isEditable, setEditable] = useState(false);
  const onSetReplyHandler = () => {
    setReplyClick(false);
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      editHandler(e);
    }
  };
  const editHandler = (e) => {
    const text = contentRef.current.innerText.trim();
    dispatch(EditPost(post._id, text));
    setEditable(false);
  };
  useEffect(() => {
    if (isEditable && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isEditable]);
  return (
    <div className={classes.userPost}>
      <div
        className={classes.postMainDiv}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setShowReplyClick(false);
            setReplyClick(false);
          }
        }}
      >
        <div className={classes.imageOthers}>
          <div className={classes.otherContent}>
            <PostHeader
              post={post}
              contentRef={contentRef}
              isEditable={isEditable}
              editHandler={editHandler}
              onEnter={onEnter}
            />
            <PostIcons
              setReplyClick={setReplyClick}
              setShowReplyClick={setShowReplyClick}
              post={post}
            />
          </div>
        </div>
        {flag && <PostDeleteEdit id={post._id} setEditable={setEditable} />}
      </div>
      {onReplyClick && (
        <ReplyPostForm
          onHideForm={onSetReplyHandler}
          userId={userId}
          postId={post._id}
        />
      )}
      {onShowReplyClick && <DisplayReplies replies={post.replies} />}
    </div>
  );
};
export default DisplayPostHelper;

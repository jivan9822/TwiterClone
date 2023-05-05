import React, { useState } from 'react';
import classes from './replypost.module.css';
import { useDispatch } from 'react-redux';
import { onClickHandler } from '../../../ApiCall/UserAction';

function ReplyPostForm({ onHideForm, userId, postId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const onClickAction = (e, name, reply) => {
    e.preventDefault();
    dispatch(onClickHandler({ name, reply, userId, postId }));
  };
  const handleSubmit = (e) => {
    console.log('Clicked!');
    e.preventDefault();
    if (text.length > 1) {
      onClickAction(e, 'reply', text);
    }
    setText('');
    onHideForm();
  };
  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      return handleSubmit(e);
    }
    if (e.key === 'Escape') {
      return onHideForm();
    }
  };
  return (
    <form className={classes.form}>
      <textarea
        className={classes.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={onKeyPressHandler}
        placeholder='Write a reply...'
        autoFocus
      />
      <button className={classes.button} onClick={handleSubmit} type='submit'>
        Reply
      </button>
    </form>
  );
}

export default ReplyPostForm;

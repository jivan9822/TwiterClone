import React, { useState } from 'react';
import classes from './replypost.module.css';

function ReplyPostForm({ onClick, onHideForm }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onHideForm();
    if (text.length > 1) {
      onClick(e, 'reply', text);
    }
    setText('');
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
    <form className={classes.form} onSubmit={handleSubmit}>
      <textarea
        className={classes.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={onKeyPressHandler}
        placeholder='Write a reply...'
        autoFocus
      />
      <button className={classes.button} type='submit'>
        Reply
      </button>
    </form>
  );
}

export default ReplyPostForm;

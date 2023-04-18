import React, { useState } from 'react';
import classes from './replypost.module.css';

function ReplyPostForm({ onClick }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(text);
    onClick(e, 'reply', text);
    setText('');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <textarea
        className={classes.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Write a reply...'
      />
      <button className={classes.button} type='submit'>
        Reply
      </button>
    </form>
  );
}

export default ReplyPostForm;

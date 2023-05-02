import React from 'react';
import classes from './Backdrop.module.css';

const DisplayContent = ({ text, onClose }) => {
  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.content}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DisplayContent;

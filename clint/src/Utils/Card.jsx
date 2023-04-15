import classes from './card.module.css';

const Card = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};
export default Card;

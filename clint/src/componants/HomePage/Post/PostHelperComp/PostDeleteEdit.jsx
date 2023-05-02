import classes from '../display.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { DeletePost } from '../../../../ApiCall/Delete';

const PostDeleteEdit = (props) => {
  const dispatch = useDispatch();

  const deletePostHandler = (e) => {
    e.preventDefault();
    dispatch(DeletePost(props.post));
  };

  return (
    <div className={classes.editDeleteBtn}>
      <FaTrash
        fill='black'
        className={classes.delBtn}
        onClick={deletePostHandler}
      />
      <FaEdit
        fill='black'
        className={classes.edtBtn}
        onClick={() => props.setEditable(true)}
      />
    </div>
  );
};
export default PostDeleteEdit;

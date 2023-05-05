import classes from '../display.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePost } from '../../../../ApiCall/Delete';

const PostDeleteEdit = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const deletePostHandler = (e) => {
    e.preventDefault();
    dispatch(DeletePost(props.post, data.loginUser, data.allUser));
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

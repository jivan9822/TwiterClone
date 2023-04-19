import { useContext } from 'react';
import userContext from '../Context/user-context';
import postContext from './../Context/post-context';

export const useUserData = (post) => {
  const user = useContext(userContext);
  const allPosts = useContext(postContext);
  const initialColor = post?.likes?.includes(user?.user?._id);

  return {
    user,
    allPost: allPosts.posts,
    initialColor,
  };
};

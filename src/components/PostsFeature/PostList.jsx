import { useSelector, useDispatch } from "react-redux";
import { selectPosts, postActions, getPostsError, getPostsStatus } from "../../redux/slices/postSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const dispatch = useDispatch()

  const posts = useSelector(selectPosts)
  const postsStatus = useSelector(getPostsStatus)
  const postsError = useSelector(getPostsError)

  //test commit

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(postActions.fetchPosts())
    }
  }, [])

  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading ....</p>
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>
  }


  return (
    <div>
      <h2>Posts:</h2>
      {content}
    </div>
  )
};

export default PostList;

import { useSelector, useDispatch } from "react-redux";
import { selectPosts, postActions, getPostsError, getPostsStatus } from "../../redux/slices/postSlice";
import { useEffect } from "react";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const PostList = () => {
  const dispatch = useDispatch()

  const posts = useSelector(selectPosts)
  const postsStatus = useSelector(getPostsStatus)
  const postsError = useSelector(getPostsError)

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(postActions.fetchPosts())
    }
  }, [postsStatus])

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => {
    return (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
        <p className="postCredit">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    )
  })

  return (
    <div>
      <h2>Posts:</h2>
      {renderedPosts}
    </div>
  )
};

export default PostList;

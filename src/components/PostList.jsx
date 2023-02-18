import { useSelector, useDispatch } from "react-redux";
import { selectPosts, postActions } from "../redux/slices/postSlice";

const PostList = () => {
  const posts = useSelector(selectPosts)
  const renderedPosts = posts.map((post) => {
    return (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
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

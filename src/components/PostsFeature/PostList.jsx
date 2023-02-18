import { useSelector, useDispatch } from "react-redux";
import { selectPosts, postActions } from "../../redux/slices/postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostList = () => {
  const posts = useSelector(selectPosts)
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

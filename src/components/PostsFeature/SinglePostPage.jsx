import { useSelector } from "react-redux"
import { selectPostById } from "../../redux/slices/postSlice"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Postauthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"

const SinglePostPage = () => {
    //retrieve postId
    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId))) //logic to find is in the slice.
    if (!post) {
        return (
            <section>
                <h2>Post not found! </h2>
            </section>
        )
    }
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${postId}`}>Edit Post</Link>
                <Postauthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage
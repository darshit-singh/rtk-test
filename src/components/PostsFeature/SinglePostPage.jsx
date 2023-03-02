import { useSelector } from "react-redux"
import { selectPostById } from "../../redux/slices/postSlice"
import Postauthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons "

const SinglePostPage = () => {
    //retrieve postId

    const post = useSelector((state) => selectPostById(state, postId)) //logic to find is in the slice.
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
                <Postauthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage
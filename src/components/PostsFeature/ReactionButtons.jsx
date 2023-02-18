import { useDispatch } from "react-redux"
import { postActions } from "../../redux/slices/postSlice"

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()

    //first one is the key, second one is the value.
    //each entry will be an array of key and value
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => dispatch(postActions.reactionAdded({ postId: post.id, reaction: name }))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return (
        <div>{reactionButtons}</div>
    )
}

export default ReactionButtons
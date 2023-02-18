import { useSelector } from "react-redux"
import { selectUsers } from "../../redux/slices/userSlice"

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectUsers)
    const author = users.find(user => user.id === userId)
    return (
        <span>
            by {author ? author.name : 'Unknown author'}
        </span>
    )
}

export default PostAuthor
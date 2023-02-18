import { useState } from "react"
import { postActions } from "../redux/slices/postSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectUsers } from "../redux/slices/userSlice"

const AddPostForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postActions.postAdded(title, content)
      )
      setTitle("")
      setContent("")
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          type="text"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm
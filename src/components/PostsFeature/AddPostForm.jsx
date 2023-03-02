import { useState } from "react"
import { postActions } from "../../redux/slices/postSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectUsers } from "../../redux/slices/userSlice"

const AddPostForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")
  const [addRequestStatus, setAddRequestStatus] = useState("idle")

  const users = useSelector(selectUsers)

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle"

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending")
        dispatch(postActions.addNewPost({ title, body: content, userId })).unwrap()
        //rtk adds and unwrap function to the returned promise
        //then that returns a new promise that either has the action payload
        //or it throws an error if it's the rejected action
        //that let's us use the try catch block here.
        setTitle("")
        setContent("")
        setUserId("")
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus("idle")
      }
    }
  }

  const usersOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    )
  })

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Post Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm
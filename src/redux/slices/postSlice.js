import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}
//can directly set state inside createslice as it uses immer.js under the hood so push like this doesn't mutate the state
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.posts.push(action.payload)
            },
            prepare: (title, content, userId) => {
                const id = nanoid()
                return {
                    payload: {
                        id,
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                //this would normally mutate the state but since we're inside createslice, immerjs takes care of it
                existingPost.reactions[reaction]++
            }
        }
    }
})

//always export select here, cuz if the shape of the state changes, you only have to make changes in this file, not everywhere else.
export const selectPosts = (state) => state.posts.posts //posts array inside the initial state

export const postActions = { ...postSlice.actions }

export default postSlice.reducer
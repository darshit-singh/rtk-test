import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

//old static posts
// {
//     id: '1',
//     title: 'Learning Redux Toolkit',
//     content: "I've heard good things.",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//         thumbsUp: 0,
//         wow: 0,
//         heart: 0,
//         rocket: 0,
//         coffee: 0
//     }
// },
// {
//     id: '2',
//     title: 'Slices...',
//     content: "The more I say slice, the more I want pizza.",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//         thumbsUp: 0,
//         wow: 0,
//         heart: 0,
//         rocket: 0,
//         coffee: 0
//     }
// }
const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

//create the async thunk. A thunk means that it is a piece of code that does some delayed work.
const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})
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
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                //Adding date and reactions
                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                })
                state.posts = loadedPosts
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                console.log('action', action.payload)
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                //this would normally mutate the state but since we're inside createslice, immerjs takes care of it
                state.posts.push(action.payload)
            })
    }
})

//always export select here, cuz if the shape of the state changes, you only have to make changes in this file, not everywhere else.
export const selectPosts = (state) => state.posts.posts //posts array inside the initial state
export const getPostsStatus = state => state.posts.status
export const getPostsError = state => state.posts.error

export const postActions = {
    ...postSlice.actions,
    fetchPosts,
    addNewPost
}

export default postSlice.reducer
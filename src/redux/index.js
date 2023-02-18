import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postsReducer from "./slices/postSlice";
import usersReducer from "./slices/userSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: usersReducer,
    }
})

export default store;
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postsReducer from "./slices/postSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: userSlice,
    }
})

export default store;
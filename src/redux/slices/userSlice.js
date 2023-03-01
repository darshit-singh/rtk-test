import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users' // could instead create an axios instance instead of base url

const initialState = []

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload   //this means we're completely overwriting the state. 
        })
    }
})

export const selectUsers = state => state.users

export const userActions = {
    ...userSlice.actions,
    fetchUsers
}

export default userSlice.reducer
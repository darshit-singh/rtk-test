import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users' // could instead create an axios base url

const initialState = [
    { id: '0', name: 'Darshit Singh' },
    { id: '1', name: 'test name 2' },
    { id: '2', name: 'test name 3' }
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export const selectUsers = state => state.users

export const userActions = { ...userSlice.actions }

export default userSlice.reducer
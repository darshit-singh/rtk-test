import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: "counterName",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0
        },
        addValue: (state, action) => {
            state.count += action.payload
        }
    }
})

export const counterActions = { ...counterSlice.actions }

export default counterSlice.reducer
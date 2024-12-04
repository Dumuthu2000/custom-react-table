import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUserData: (currentState, action)=>{
            currentState.push(action.payload);
        },
    }
});

export const {addUserData} = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userData: []
  },
  reducers: {
    addUser: (state, action) => {
      state.userData.push(action.payload);
    },
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
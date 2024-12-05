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
    updateUser: (state, action) => {
      const { index, userData } = action.payload;
      state.userData[index] = userData;
    },
    deleteUser: (state, action) => {
      state.userData = state.userData.filter((_, index) => index !== action.payload);
    }
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
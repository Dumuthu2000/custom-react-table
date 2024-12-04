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
  }
});

export const { addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
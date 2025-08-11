import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem("loggedUser")) || null,
  },
  reducers: {
    loggedUserInfo: (state, action) => {
      state.user = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { loggedUserInfo } = authSlice.actions

export default authSlice.reducer
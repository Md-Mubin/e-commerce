import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'

export default configureStore({
    reducer: {
        counter: authSlice,
    }
})
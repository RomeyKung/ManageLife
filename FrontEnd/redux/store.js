import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import healthSlice from './healthSlice'
const store = configureStore({
    reducer: {
        user: userSlice,
        health: healthSlice
    },
})

export default store
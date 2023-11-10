import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    _id: "",
    userId: "",
    firstName: "",
    lastName: "",
    username:"",
    imagePath: "",
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            return action.payload;
        },
    }
})



export const { saveUserData,} = userSlice.actions
export default userSlice.reducer
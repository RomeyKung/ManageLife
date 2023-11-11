import { createSlice } from "@reduxjs/toolkit";
const initialState = {

}
export const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        saveHealthData: (state, action) => {
            return action.payload;
        },
    }
})



export const { saveHealthData,} = healthSlice.actions
export default healthSlice.reducer
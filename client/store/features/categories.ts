import { createSlice } from "@reduxjs/toolkit";



const categories=createSlice({
    name:'category',
    initialState:{
        data:null
    },
    reducers:{
        _setBuild:(state,action)=>{
            state.data=action.payload
        }
    }
})
export const {_setBuild}=categories.actions
export default categories.reducer
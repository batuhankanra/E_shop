import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export const logoutApi=createAsyncThunk('auth/logout',async ()=>{
    try{
        const res=await axios.post('http://localhost:8080/api/auth/logout',{withCredentials:true})
   
        return res.data

    }catch(err){
        return {msg:'hata olustu'}
    }
})


const initialState ={
    msg:'',
    status:'Idle'
}


const logout=createSlice({
    name:'logout',
    initialState,
    reducers:{
        logout: (state) => {
            localStorage.removeItem('user');

            state.msg = ''
            state.status = 'Idle'
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(logoutApi.rejected,(state,action)=>{
            state.msg=''
            state.status='Fail'
        })
        builder.addCase(logoutApi.pending,(state)=>{
            state.msg=''
            state.status='Loading'
        })
        builder.addCase(logoutApi.fulfilled,(state,action:PayloadAction<login>)=>{
            localStorage.setItem('user', JSON.stringify({ name: action.payload.name, email: action.payload.email }));
            state.msg=action.payload.msg
            state.status='Success'
        })
    }
})
export default logout.reducer
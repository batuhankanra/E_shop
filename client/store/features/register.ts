import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


export const register=createAsyncThunk<register,registerProps,{rejectValue: errorRedux}>('auth/register',async (data,{rejectWithValue})=>{
    try{
        const res=await axios.post('http://localhost:8080/api/auth/register',data,{withCredentials:true})
   
        return res.data

    }catch(err){
        const error = err as AxiosError;
            const data = error.response?.data as errorRedux;

            return rejectWithValue({ msg: data?.msg || 'Sunucu hatası' });
    }
})


const initialState:initialStateRegister ={
    msg:'',
    error:"",
    status:'Idle'
}


const login=createSlice({
    name:'login',
    initialState,
    reducers:{
        logout: (state) => {
            localStorage.removeItem('user');

            state.msg = ''
            state.status = 'Idle'
            state.error = ''
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(register.rejected,(state,action)=>{
            state.error=(action.payload as errorRedux)?.msg ?? 'beklenmeyen hata'
            state.msg=''
            state.status='Fail'
        })
        builder.addCase(register.pending,(state)=>{
            state.msg=''
            state.status='Loading'
        })
        builder.addCase(register.fulfilled,(state,action:PayloadAction<login>)=>{
            localStorage.setItem('user', JSON.stringify({ name: action.payload.name, email: action.payload.email }));
            state.msg=action.payload.msg
            state.error=''
            state.status='Success'
        })
    }
})
export default login.reducer
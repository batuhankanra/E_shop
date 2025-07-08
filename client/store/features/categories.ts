import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "@/app/lib/api";


export const categoryGet=createAsyncThunk<CategoriesProps[],void,{rejectValue: errorRedux}>('categories/get',async (_,{rejectWithValue})=>{
    try{
        const res=await api.get('/categories',{withCredentials:true})
   
        return res.data

    }catch(err){
        const error = err as AxiosError;
            const data = error.response?.data as errorRedux;

            return rejectWithValue({ msg: data?.msg || 'Sunucu hatası' });
    }
})
export const categoryAdd=createAsyncThunk<errorRedux,AddCategory,{rejectValue: errorRedux}>('categories/add',async (data,{rejectWithValue})=>{
    try{
        const res=await api.post('/categories/add',{name:data.name},{withCredentials:true})
   
        return res.data

    }catch(err){
        const error = err as AxiosError;
            const data = error.response?.data as errorRedux;

            return rejectWithValue({ msg: data?.msg || 'Sunucu hatası' });
    }
})


const initialState:ReduxData ={
    data:[],
    error:'',
    msg:''
}


const categories=createSlice({
    name:'category',
    initialState,
    reducers:{
        _setBuild:(state,action)=>{
            state.data=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(categoryGet.rejected,(state,action)=>{
            state.error=(action.payload as errorRedux)?.msg ?? 'beklenmeyen hata'
            state.data=[]
        })
        builder.addCase(categoryGet.pending,(state)=>{
            state.data=[]
        })
        builder.addCase(categoryGet.fulfilled,(state,action:PayloadAction<CategoriesProps[]>)=>{
            state.data=action.payload 
        })
        builder.addCase(categoryAdd.rejected,(state,action)=>{
            state.error=(action.payload as errorRedux)?.msg ?? 'beklenmeyen hata'
            state.data=[]
        })
        builder.addCase(categoryAdd.pending,(state)=>{
            state.data=[]
        })
        builder.addCase(categoryAdd.fulfilled,(state,action:PayloadAction<errorRedux>)=>{
            state.msg=action.payload.msg
        })
    }
})
export const {_setBuild}=categories.actions
export default categories.reducer
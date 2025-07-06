import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


export const categoryGet=createAsyncThunk<CategoriesProps[],void,{rejectValue: errorRedux}>('categories/get',async (_,{rejectWithValue})=>{
    try{
        const res=await axios.get('http://localhost:8080/api/categories')
   
        return res.data

    }catch(err){
        const error = err as AxiosError;
            const data = error.response?.data as errorRedux;

            return rejectWithValue({ msg: data?.msg || 'Sunucu hatası' });
    }
})


const initialState:ReduxData ={
    data:[],
    error:''
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
    }
})
export const {_setBuild}=categories.actions
export default categories.reducer
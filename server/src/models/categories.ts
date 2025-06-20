import mongoose, { Schema } from "mongoose";
import { ICATEGORIES } from "../typescript/props";

const categorySchema=new Schema<ICATEGORIES>({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique: true,
        required:true
    },
    is_active:{
        type:Boolean,
        required:true
    }
},{
    versionKey:false,
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})
export const Categories=mongoose.model<ICATEGORIES>('Categories',categorySchema)
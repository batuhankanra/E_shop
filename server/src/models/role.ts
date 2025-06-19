import mongoose, { Schema } from "mongoose";
import { IROLE } from "../typescript/props";

const roleSchema=new Schema<IROLE>({
    name:{
        type:String,
        required:true
    },
    permissions :{
        type:[String],
        required:true
    }
},{
    versionKey:false,
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})
export const Role=mongoose.model<IROLE>('Role',roleSchema)
import mongoose, { Schema } from "mongoose";
import { IUSER } from "../typescript/props";


const UserSchema=new Schema<IUSER>({
    name:{
        type: String, 
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:'Role'
    }
},{
    versionKey:false,
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})

export const User = mongoose.model<IUSER>('User', UserSchema);

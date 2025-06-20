import mongoose, { Schema } from "mongoose";
import { IPRODUCT } from "../typescript/props";

const productSchema=new Schema<IPRODUCT>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:[String]
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
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
export const Product=mongoose.model<IPRODUCT>('Product',productSchema)
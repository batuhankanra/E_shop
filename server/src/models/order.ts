import mongoose, { Schema } from "mongoose";
import { IORDER } from "../typescript/props";

const orderSchema=new Schema<IORDER>({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                required: true 
            },
            price:{
                type:Number
            }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
},{
    versionKey:false,
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})
export const Order=mongoose.model<IORDER>('Order',orderSchema)
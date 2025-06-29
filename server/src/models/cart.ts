import mongoose, { Schema } from "mongoose";
import { ICART } from "../typescript/cart";


const cartSchema=new Schema<ICART>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
        },
    ],
},{
    versionKey:false,
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})
export const Cart=mongoose.model<ICART>('cart',cartSchema)
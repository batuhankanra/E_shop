
import { findProps, IORDER } from "../typescript/props";
import { Order } from "../models/order";

class orderService{
    async find({id,name}:findProps):Promise<IORDER | IORDER[] | null>{
        try{
            let data
            if(id){
                data=await Order.findOne({_id:id})
                return data
            }
            if(name){
                data=await Order.findOne({name})
                return data
            }
            data=await Order.find()
            if(!data){
                return data
            }
                
            return data
        }catch{
            return null
        }
    
        }
}
export default new orderService()
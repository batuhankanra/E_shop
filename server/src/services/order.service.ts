import { IORDER, ORderUpdates } from "../typescript/order";
import { Order } from "../models/order";
import { log } from "../log/log";

class orderService{
    async find({id}:{ id?:string}):Promise<IORDER | IORDER[] | null>{
        try{
            let data
            if(id){
                data=await Order.findOne({_id:id})
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
    async create(orderData:Partial<IORDER>):Promise<boolean>{
        try {
            const createdOrder = await Order.create({
                user:orderData.user,
                items:orderData.items,
                totalAmount:orderData.totalAmount,
                status:orderData.status
            });
            return !!createdOrder;
        } catch (error) {
            log.error('Order creation failed');
            return false;
        }
    }
    async delete(id:string):Promise<boolean>{
        try {
            const createdOrder = await Order.deleteOne({_id:id})
            if(createdOrder.deletedCount<=0){
                return false
            }
            return true
        } catch (error) {
            log.error('Order creation failed');
            return false;
        }
    }
    async update(id:string,updates:ORderUpdates):Promise<boolean>{
        try {
            const updatedOrder = await Order.updateOne({_id:id},{$set:updates},{new:true});
            if(updatedOrder.modifiedCount>0){
                return true
            }
            return false;
        } catch (err) {
                console.error("Order update error:", err);
                return false;
        }
    }
    
}
export default new orderService()
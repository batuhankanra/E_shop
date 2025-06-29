import { log } from "../log/log";
import { Cart } from "../models/cart";
import { CartProps, ICART } from "../typescript/cart";

class cartService{
    async find({id}:{ id?:string}):Promise<ICART | ICART[] | null>{
        try{
            let data
            if(id){
                data=await Cart.findOne({_id:id})
                
                return data
            }
            data=await Cart.find()
            if(!data){
                return null
            }
            return data
        }catch{
            return null
        }
    
    }
    async create(orderData:Partial<ICART>):Promise<boolean>{
        try {
            const createdOrder = await Cart.create({
                user:orderData.user,
                items:orderData.items
            });
            return !!createdOrder;
        } catch (error) {
            log.error('Order creation failed');
            return false;
        }
    }
    async delete(id:string):Promise<boolean>{
        try {
            const createdOrder = await Cart.deleteOne({_id:id})
            if(createdOrder.deletedCount<=0){
                return false
            }
            return true
        } catch (error) {
            log.error('Order creation failed');
            return false;
        }
    }
    async update(id:string,updates:CartProps):Promise<boolean>{
        try {
            const updatedOrder = await Cart.updateOne({_id:id},{$set:updates},{new:true});
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
export default new cartService()
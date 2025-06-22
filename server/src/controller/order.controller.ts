import { Request, Response } from "express";
import orderService from "../services/order.service";



class OrderController{
    public async find(req:Request,res:Response){
        try{
            const data=await orderService.find({})
            res.status(200).json(data)
            return
        }catch (err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async findId(req:Request,res:Response){
        try{
            const {id}=req.params
            
            const data=await orderService.find({id})
           
            if(!data){
                res.status(400).json({msg:'Böyle bir sipariş bulunmamaktadır'})
                return
            }
            res.status(200).json(data)
        }catch (err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async create(req:Request,res:Response){
        try{

        }catch (err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async update(req:Request,res:Response){
        try{

        }catch (err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async delete(req:Request,res:Response){
        try{

        }catch (err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
}
export default new OrderController()
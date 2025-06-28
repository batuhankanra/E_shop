import { Request, Response } from "express";
import { log } from "../log/log";
import { IORDER, ItemProps, ORderUpdates } from "../typescript/order";
import productService from "../services/product.service";
import { Order } from "../models/order";
import { USerPRops } from "../typescript/props";
import orderService from "../services/order.service";




class OrderController{
    public async find(req:Request,res:Response){
        try{
            const data= await orderService.find({})
            res.status(200).json(data)
        }
        catch (err){
            log.error('find controller problem')
            res.status(500).json({msg:'server problem'})
        }
    }
    public async findId(req:Request,res:Response){
        try{
            const {id} =req.params
            if(!id){
                res.status(400).json({ msg: 'Böyle bir ürün bulunamadı' });
                return
            }
            const data =await orderService.find({id})
            if(!data){
                res.status(400).json({ msg: 'Böyle bir ürün bulunamadı' });
                return
            }
            res.status(200).json(data)
            return
            
        }
        catch (err){
            log.error('findId controller problem')
            res.status(500).json({msg:'server problem'})
        }
    }
    public async create(req:Request,res:Response){
        try{
            const items=req.body.items as ItemProps[]
            const user:USerPRops =req.user
            if(!user){
                res.status(400).json({msg:'Ürün olmadan sipariş veremezsiniz'})
                return 
            }
            
            if(!Array.isArray(items) || items.length===0 ){
                res.status(400).json({msg:'Ürün olmadan sipariş veremezsiniz'})
                return 
            }
            let totalAmount =0
            for(let item of items){
                const existItem=await productService.find({id:String(item.product)})
                if(!existItem){
                    res.status(400).json({msg:'Böyle bir ürün bulunamadı'})
                    return
                }
                totalAmount +=item.price * item.quantity
            }
            const created=await orderService.create({user:user._id,items,totalAmount,status:'pending'})
            if(!created){
                res.status(409).json({msg:'olusturulmadi'})
            }
            res.status(201).json({msg :"Başarılı"})
        }
        catch (err){
            log.error('create controller problem')
            res.status(500).json({msg:'server problem'})
        }
    }
    public async update(req:Request,res:Response){
       try{
           
            const { id } = req.params;
            const body: ORderUpdates = req.body;

            if (!id) {
                 res.status(400).json({ msg: 'Böyle bir ürün bulunamadı' });
                 return
            }

            // Sipariş var mı kontrolü
            const existingOrder = await orderService.find({ id });
            if (!existingOrder) {
             res.status(400).json({ msg: 'Sipariş bulunamadı' });
             return
            }

            // Güncellenecek alanlar
            const update: ORderUpdates = {};
            let totalAmount = 0;

            // Status kontrolü
            if (body?.status) {
            update.status = body.status;
            }

            // Items güncellemesi
            if (Array.isArray(body?.items) && body.items.length > 0) {
                for (const item of body.items) {
                    const existItem = await productService.find({ id: String(item.product) });
                    if (!existItem || Array.isArray(existItem)) {
                    res.status(400).json({ msg: `Ürün (${item.product}) bulunamadı` });
                    return
                    }
                    totalAmount += item.price * item.quantity;
                }

                update.items = body.items;
                update.totalAmount = totalAmount;
            }

            // User güncellemesi
            if (body?.user) {
            update.user = body.user;
            }

            // Güncelleme işlemi
            const updated = await orderService.update(id, update);
            if (!updated) {
             res.status(400).json({ msg: 'Sipariş güncellenemedi' });
             return
            }

             res.status(200).json({ msg: 'Başarılı' });
             return
        }
        catch (err){
            log.error('update controller problem')
            res.status(500).json({msg:'server problem'})
        }
    }
    public async delete(req:Request,res:Response){
        try{
            const {id} =req.params
            if(!id){
                res.status(400).json({ msg: 'Böyle bir ürün bulunamadı' });
                return
            }
            const existID=await orderService.find({id})
            if(!existID){
                res.status(400).json({ msg: 'Böyle bir ürün bulunamadı' });
                return
            }
            const deleteOrder=orderService.delete(id)
            if(!deleteOrder){
                res.status(400).json({msg:'Ürün Silinemedi'})
                return
            }   
            res.status(200).json({msg:'Ürün Silinde'})
            return
        }
        catch (err){
            log.error('delete controller problem')
            res.status(500).json({msg:'server problem'})
        }
    }
}
export default new OrderController()
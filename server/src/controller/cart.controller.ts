import { Request, Response } from "express";
import { log } from "../log/log";
import productService from "../services/product.service";
import { USerPRops } from "../typescript/props";
import cartService from "../services/cart.service";
import { cartItemProps, CartProps } from "../typescript/cart";




class CartController{
    public async find(req:Request,res:Response){
        try{
            const data= await cartService.find({})
            res.status(200).json(data)
            return
        }
        catch (err){
            log.error('find controller problem')
            res.status(500).json({msg:'server problem'})
            return
        }
    }
    public async findId(req:Request,res:Response){
        try{
            const {id} =req.params
            if(!id){
                res.status(400).json({ msg: 'Böyle bir ürün bulunamadı' });
                return
            }
            const data =await cartService.find({id})
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
            const items=req.body.items as cartItemProps[]
            const user:USerPRops =req.user
            if(!user){
                res.status(400).json({msg:'Ürün olmadan sipariş veremezsiniz'})
                return 
            }
            
            if(!Array.isArray(items) || items.length===0 ){
                res.status(400).json({msg:'Ürün olmadan sipariş veremezsiniz'})
                return 
            }
            for (const item of items) {
                const existItem = await productService.find({ id: String(item.product) });
                if (!existItem || Array.isArray(existItem)) {
                    res.status(400).json({ msg: `Ürün  bulunamadı` });
                    return
                }
            }
            const created=await cartService.create({user:user._id,items})
            if(!created){
                res.status(409).json({msg:'olusturulmadi'})
            }
            res.status(201).json({msg :"Başarılı"})
            return
        }
        catch (err){
            log.error('create controller problem')
            res.status(500).json({msg:'server problem'})
        }
    }
    public async update(req:Request,res:Response){
       try{
           
            const { id } = req.params;
            const body: CartProps = req.body;

            if (!id) {
                 res.status(400).json({ msg: 'Böyle bir ürün bulunamadı' });
                 return
            }

            
            const existCart = await cartService.find({ id });
            if (!existCart) {
             res.status(400).json({ msg: 'Sipariş bulunamadı' });
             return
            }

            const update: CartProps = {};


            // Items güncellemesi
            if (Array.isArray(body?.items) && body.items.length > 0) {
                for (const item of body.items) {
                    const existItem = await productService.find({ id: String(item.product) });
                    if (!existItem || Array.isArray(existItem)) {
                        res.status(400).json({ msg: `Ürün  bulunamadı` });
                        return
                    }
                }
                update.items=body.items
                
                
            }

            // User güncellemesi
            if (body?.user) {
            update.user = body.user;
            }

            const updated = await cartService.update(id, update);
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
            const existID=await cartService.find({id})
            if(!existID){
                res.status(400).json({ msg: 'Böyle bir ürün bulunamadı' });
                return
            }
            const deleteCart=await cartService.delete(id)
            if(!deleteCart){
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
export default new CartController()
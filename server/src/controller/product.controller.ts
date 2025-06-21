import { Request, Response } from "express";
import { Product } from "../models/product";
import productService from "../services/product.service";




class ProductController{
    public async get(req:Request,res:Response){
        try{
            const data=await productService.find({})
            res.status(200).json(data)
        }catch (err){
            res.status(500).json({msg:'server problem'})
            return
        }
    }
    public async getId(req:Request,res:Response){
        try{
            const {id}=req.params
            
        }catch (err){
            res.status(500).json({msg:'server problem'})
            return
        }
    }
    public async create(req:Request,res:Response){
        try{   
            const {name,description,stock,price,is_active}=req.body
            if(!name || !description || !stock || !price || !is_active){
                res.status(400).json({msg:'Bütün alanları doldurmanız lazım'})
            }
            
            let booleanStock=false
            if(stock==='true'){
                booleanStock=true
            }else{
                booleanStock=false
            }
            const existName=await productService.find(name)

            let fileName = '';
            if (req.file) {
                fileName=await productService.upload(req.file,'uploads',name)
            }


            await Product.create({
                name,
                description,
                images:fileName,
                stock:Number(stock),
                price:Number(price),
                is_active:booleanStock
            })
            res.status(200).json({msg:'Başarılı'})
            return
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
export default new ProductController()
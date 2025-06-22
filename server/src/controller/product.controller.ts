import { Request, Response } from "express";
import productService from "../services/product.service";
import { ProductProps } from "../typescript/props";

import { log } from "../log/log";




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
            const data=await productService.find({id})
            if(!data){
                res.status(400).json({ msg: 'Ürün bulunamadı' });
                return
            }
            res.status(200).json(data)
            return
            
        }catch (err){
            res.status(500).json({msg:'server problem'})
            return
        }
    }
    public async create(req:Request,res:Response){
        try {
            const { name, description, stock, price, is_active } = req.body;

            if (!name || !description || !stock || !price || is_active === undefined) {
            res.status(400).json({ msg: 'Bütün alanları doldurmanız lazım' });
            return;
            }
            const active = is_active === 'true' ? is_active === true : is_active===false;
            const existName = await productService.find({ name });
            if (existName) {
            res.status(409).json({ msg: 'Böyle bir ürün ismi var' });
            return;
            }
            const fileNames: string[] = [];
            if (req.file) {
            const fileName = await productService.upload(req.file, 'uploads', name);
            fileNames.push(fileName);
            }
            const created = await productService.create({name, description,stock: Number(stock), price: Number(price), is_active: active,images: fileNames});

            if (!created) {
            res.status(500).json({ msg: 'Ürün oluşturulamadı' });
            return;
            }
            res.status(201).json({ msg: 'Başarılı' }); // 201: Created
        } catch (err) {
            log.error("createProduct error:");
            res.status(500).json({ msg: 'Sunucu hatası' });
        }
    }
    public async update(req:Request,res:Response){
        try {
            const { id } = req.params;
            const existProduct = await productService.find({ id });

            if (!existProduct || Array.isArray(existProduct)) {
                res.status(400).json({ msg: 'Ürün bulunamadı' });
                return;
            }

            const { name, description, stock, price, is_active } = req.body;

            const updates: ProductProps = {};

            if (name) updates.name = name;
            if (description) updates.description = description;
            if (stock !== undefined) updates.stock = Number(stock);
            if (price !== undefined) updates.price = Number(price);

            if (is_active === 'true' || is_active === true) updates.is_active = true;
            else if (is_active === 'false' || is_active === false) updates.is_active = false;

            if (req.file) {
                for (const image of existProduct.images) {
                    await productService.delete(image);
                }

             
                const fileName = await productService.upload(req.file, 'uploads', name || existProduct.name);
                updates.images = [fileName]; 
            }
            const result = await productService.update(id, updates);
            if (!result) {
                res.status(400).json({ msg: 'Ürün güncellenemedi' });
                return;
            }

            res.status(200).json({ msg: 'Ürün başarıyla güncellendi' });
            return;

        } catch (err) {
        log.error('created product problem')
        res.status(500).json({ msg: 'Sunucu hatası' });
        return;
        }
    }
    public async delete(req:Request,res:Response){
        try{
            const { id } =req.params
            const existProduct=await productService.find({id})
            if(!existProduct || Array.isArray(existProduct)){
                res.status(400).json({msg:'Ürün bulunamadı'})
                return
            }
            for (const image of existProduct.images) {
                await productService.delete(image);
            }
            const data=await productService.deleteId(id)
            if(!data){
                res.status(400).json({msg:'Ürün silinemedi'})
                return
            }
            
            res.status(200).json({msg:'Ürün başarılı bir şekilde silindi'})
            return

        }catch (err){
            res.status(500).json({msg:'server problem'})
            return
        }
    }
}
export default new ProductController()
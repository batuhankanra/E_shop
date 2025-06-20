import { Request,Response } from "express";
import { Categories } from "../models/categories";
import slugify from 'slugify';
import categoriesService from "../services/categories.service";
import { categoriesUpdatesProps } from "../typescript/props";


class CategoriesController{
    public async find(req:Request,res:Response){
        try{
            const data=await categoriesService.find({})
            if(!data){
                res.status(400).json({msg:'Ürün bulunamadı'})
                return
            }
            res.status(200).json(data)
            return
        }catch(err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async findID(req:Request,res:Response){
        try{
            const {id} = req.params
            if(!id){
                res.status(404).json({msg:'Ürün bulunamadı'})
                return
            }
            const data=await categoriesService.find({id})
            if(!data){
                res.status(400).json({msg:'Ürün bulunamadı'})
                return
            }
            res.status(200).json(data)
            return

            
        }catch(err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async create(req:Request,res:Response){
        try{
            const {name}=req.body
            if(!name){
                res.status(400).json({msg:'İsmi boş gönderilmez'})
                return
            }
            const existing=await categoriesService.find({name})
            if(existing){
                res.status(400).json({msg:'Kategori ismi var'})
                return

            }
            const slug = slugify(name, { lower: true, strict: true });
            await Categories.create({
                name,
                slug,
                is_active:false
            })
            res.status(201).json({msg:'Başarılı'})
        }catch(err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async update(req:Request,res:Response){
        try{
            const {id}=req.params
            if(!id){
                res.status(400).json({msg:'Ürün bulunamadı'})
                return
            }
            
            const {name,is_active}:{name:string,is_active:boolean}=req.body
            const updates:categoriesUpdatesProps={}
            
            if(name){
                updates.name=name
                updates.slug=slugify(name, { lower: true, strict: true });
            }
            if(is_active){
                updates.is_active=is_active
            }
            const exitstId=await categoriesService.find({id})
            
            if(!exitstId){
                res.status(400).json({msg:'Ürün bulunamadı'})
                return
            }
            const update=await Categories.updateOne({_id:id},updates)
            if(!update){
                res.status(400).json({msg:'Ürün bulunamadı'})
                return
            }
            res.status(200).json({msg:'Başarılı'})
            return
        }catch(err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async delete(req:Request,res:Response){
       try{
            const {id}=req.params
            if(!id){
                res.status(400).json({msg:'Ürün bulunamadı'})
                return
            }
            await Categories.deleteOne({_id:id})
           
            res.status(200).json({msg:'Başarılı'})
            return
        }catch(err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
}
export default new CategoriesController
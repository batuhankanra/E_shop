import { Request,Response } from "express";
import { Role } from "../models/role";
import roleService from "../services/role.service";
import { UpdateRoleInput } from "../typescript/props";


class roleController{
    public async add(req:Request,res:Response){
        try{
            const {name,permissions}=req.body
            if(!name ||!Array.isArray(permissions )){
                res.status(400).json({msg:'Bütün alanları doldurun'})
                return
            }
            const existing=await roleService.find({name})
            if(existing){
                res.status(400).json({msg:'Bu isimde bir rol zaten var.'})
                return
            }
            const roleCreate=await roleService.create(name,permissions)
            if(!roleCreate){
                res.status(500).json({msg:'Data base de sıkıntı.'})
                return 
            }
            res.status(201).json({msg:'rol oluşturuldu'})
            return


        }catch(err){
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async getFull(req:Request,res:Response){
        try{
            const data=await roleService.getMany()
            res.status(200).json(data)
            return
        }catch(err){
            
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async getID(req:Request,res:Response){
         try{
            const {id} =req.params
            const data=await roleService.find({id})
            if(!data){
                res.status(400).json({msg:'Böyle bir kullanıcı yok'})
                return
            }
          
            res.status(200).json(data)
            return
        }catch(err){
            
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async update(req:Request,res:Response){
        try{
            const {id} =req.params
            const {name,permissions}=req.body
            const update: UpdateRoleInput = {};
            if (name) update.name = name;
            if (Array.isArray(permissions) || permissions.length>0) update.permissions = permissions
            const updates=await roleService.update(id,update)
            
          if(!updates){
             res.status(400).json({msg:'Böyle bir kullanıcı yok'})
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
            const {id} =req.params
            
            if(!id){
                res.status(400).json({msg:'Böyle bir kullanıcı yok'})
            }
            
            const deleteData=await roleService.delete(id)
            if(!deleteData) {
                res.status(400).json({msg:'Böyle bir kullanıcı yok'})
                return
            }
          
            res.status(200).json({msg:'Başarılı'})
            return
        }catch(err){
            
            res.status(500).json({msg:'server problem'})
            return 
        }
    }

}
export default new roleController()
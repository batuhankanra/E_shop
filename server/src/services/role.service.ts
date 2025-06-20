import mongoose from "mongoose";
import { Role } from "../models/role";
import { findProps, IROLE, UpdateRoleInput } from "../typescript/props";


class roleService{
    async find({name,id}:findProps):Promise<IROLE | null>{
        try{
            let data
            if(id){
               data =await Role.findOne({_id:id})
            }else{
                data =await Role.findOne({name})
            }
             
            
            if(!data){
                return null
            }
            return data
        }catch{
            return null
        }
    }
    async create(name:string,permissions:string[]):Promise<boolean>{
        try{
            const data =await Role.create({name,permissions})
            if(!data){
                return false
            }
            return true
        }catch{
            return false
        }
    }
    async getMany():Promise<IROLE[] | null>{
         try{
            const data =await Role.find()
            if(!data){
                return null
            }
            return data
        }catch{
            return null
        }
    }
    async delete(id:string):Promise<boolean>{
        try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                return false
            }
            const deleteID = await Role.deleteOne({_id:id})
            if(deleteID.deletedCount>0){
                return true
            }
            return false
        }catch{
            return false
        }
    }
    async update(id:string,updates:UpdateRoleInput):Promise<boolean>{
        try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                return false
            }
            const data = await Role.updateOne({_id:id},updates)
            if(data.modifiedCount>0){
                return true
            }
            return false
        }catch{
            return false
        }
    }
}
export default new roleService()
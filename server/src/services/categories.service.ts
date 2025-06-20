import mongoose from "mongoose";
import { Categories } from "../models/categories";
import { categoriesUpdatesProps, findProps, ICATEGORIES } from "../typescript/props";



class categoryServices{
    async find({id,name}:findProps):Promise<ICATEGORIES | ICATEGORIES[] | null>{
        try{
            let data
            if(id){
                data=await Categories.findOne({_id:id})
                return data
            }
            if(name){
                data=await Categories.findOne({name})
                return data
            }
            data=await Categories.find()
            if(!data){
                return data
            }
            
            return data
        }catch{
            return null
        }

    }
    async update(id:string,updates:categoriesUpdatesProps):Promise<boolean>{
        try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                return false
            }
            const data=await Categories.updateOne({_id:id},updates)
            if(data.modifiedCount===0){
                return false
            }
            return true
        }catch {
            return false
        }
    }
    async delete(id:string){
         try{
            if(!mongoose.Types.ObjectId.isValid(id)){
                return false
            }
            const data=await Categories.deleteOne({_id:id})
            if(data.deletedCount===0){
                return false
            }
            return true
        }catch {
            return false
        }
    }
}

export default  new categoryServices()
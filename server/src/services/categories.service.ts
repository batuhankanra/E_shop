import { Categories } from "../models/categories";
import { findProps, ICATEGORIES } from "../typescript/props";



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
}

export default  new categoryServices()
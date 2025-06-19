import { Role } from "../models/role";
import { IROLE } from "../typescript/props";


class roleService{
    async find(name:string):Promise<IROLE | null>{
        try{
            const data =await Role.findOne({name})
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
            const deleteID = await Role.deleteOne({_id:id})
            if(deleteID.deletedCount>0){
                return true
            }
            return false
        }catch{
            return false
        }
    }
}
export default new roleService()
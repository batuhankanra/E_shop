import { User } from "../models/User"
import bcrypt from 'bcrypt'
import { IUSER } from "../typescript/props"


class UserServices{
    async findId(id:string):Promise<IUSER | null>{
         try{
            const user =await User.findOne({_id:id})
            if(!user){
                
                return null
            }
            return user
            }
        catch(err){
            return null
        }
    }
    async GetUserEmail(email:string):Promise<IUSER | null> {
        try{
            const user =await User.findOne({email})
            if(!user){
                
                return null
            }
            return user
            }
        catch(err){
            return null
        }
    }
    async existPassword(password:string,hashPassword:string):Promise<boolean>{
        try{
             return await bcrypt.compare(password,hashPassword)
            }
        catch(err){
            return false
        }
    }
    async hashPassword(password:string):Promise<string>{
        return  bcrypt.hashSync(password, 10);
    }
    async createUser(name:string,email:string,password:string,role:string='68526b0df66faf00f0b89019'):Promise<IUSER | null> {
        try{
            
            const data =await User.create({name,email,password,role:role})
            
            if(!data){
                
                return null
            }
            return data
            }
        catch(err){
            return null
        }
    }
}

export default new UserServices()
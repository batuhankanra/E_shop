import { User } from "../models/User"
import bcrypt from 'bcrypt'
import { IUSER } from "../typescript/props"


class UserServices{
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
    async createUser(name:string,email:string,password:string):Promise<IUSER | null> {
        try{
            const data =await User.create({name,email,password})
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
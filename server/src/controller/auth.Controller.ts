import { Request,Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import userService from "../services/user.service";


class AuthController{
    public async register(req:Request,res:Response){
        try{
            const {name,email,password}=req.body
            if(!name || !email || !password) {
                res.status(400).json({msg:'Bütün alanları doldurun'})
                return
            } 
            const existing=await userService.GetUserEmail(email)
           
            if(existing) {
                res.status(400).json({msg:'Böyle bir email var'})
                return 
            }
            const hashPassword= await userService.hashPassword(password)
            if(!hashPassword){
                res.status(400).json({msg:'Böyle bir email var'})
                return 
            }
            const user =await User.create({name,email,password:hashPassword})
            const token =generateToken(user)
            res.status(201).json({msg:'Kayit oluşturuldu',token})
            return 
        }catch(err) {
            res.status(500).json({msg:'server problem'})
            return 
        }
    }
    public async login(req:Request,res:Response){
        try{
            const {email,password}=req.body
            if(!email || !password) {
                res.status(400).json({msg:'Bütün alanları doldurun'})
                return
            }
            const user=await userService.GetUserEmail(email)
            if(!user) {
                res.status(400).json({msg:'Email yada şifreniz hatalı'})
                return
            }
            const isPassword=await userService.existPassword(password,user.password)
            if(!isPassword){
                res.status(400).json({msg:'Email yada şifreniz hatalı'})
                return 
            }
            const token =generateToken(user)
            res.status(200).json({msg:'Giriş başarılı',token})
            return
            
        
        }catch(err) {
            res.status(500).json({msg:'server problem'})
            return
        }
    }
}
export default new AuthController()
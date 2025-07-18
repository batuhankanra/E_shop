import { Request,Response } from "express";
import { generateToken } from "../utils/jwt";
import userService from "../services/user.service";
import { config } from "../config";


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
            const user =await userService.createUser(name,email,hashPassword)
            
            if(!user){
                res.status(400).json({msg:'Böyles bir email var'})
                return
            }
            res.status(201).json({msg:'Kayit oluşturuldu'})
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
            res.status(200).cookie("token",token,{httpOnly:true,secure:process.env.NODE_ENV === "production", sameSite: "lax",maxAge: 24 * 60 * 60 * 1000}).json({msg:'Giriş başarılı',name:user.name,email:user.email})
            return
            
        
        }catch(err) {
            res.status(500).json({msg:'server problem'})
            return
        }
    }
    public async loginControl(req:Request,res:Response){
        res.json(200)
        return
    }
    public async logout(req:Request,res:Response){
            res.clearCookie("token",{httpOnly:true,sameSite:'lax',secure:config.PRODUCTION})
            res.status(200).json({msg:'Çıkış yapıldı'})
    }
}
export default new AuthController()
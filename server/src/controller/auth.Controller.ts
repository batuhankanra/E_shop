import { Request,Response } from "express";
import bcrypt from 'bcrypt'
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { log } from "../log/log";


export const register=async (req:Request,res:Response)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !email || !password) {
            res.status(400).json({msg:'Bütün alanları doldurun'})
            return
        } 
        const existing=await User.findOne({ email })
        if(existing) {
            res.status(400).json({msg:'Böyle bir email var'})
            return 
        }
        const hashPassword=  bcrypt.hashSync(password,10)
        const user =await User.create({ name , email , password:hashPassword})
        const token =generateToken(user)
        res.status(201).json({msg:'Kayit oluşturuldu',token})
        return 
    }catch(err) {
        log.error('Register Error')
        res.status(500).json({msg:'server problem'})
        return 
    }
}

export const login=async (req:Request,res:Response)=>{
     try{
        const {email,password}=req.body
        if(!email || !password) {
             res.status(400).json({msg:'Bütün alanları doldurun'})
             return
        }
        const user =await User.findOne({email})
        if(!user) {
             res.status(400).json({msg:'Email yada şifreniz hatalı'})
             return
        }
        const isPassword=await bcrypt.compare( password, user.password )
        if(!isPassword){
            res.status(400).json({msg:'Email yada şifreniz hatalı'})
             return 
        }
        const token =generateToken(user)
         res.status(200).json({msg:'Giriş başarılı',token})
         return
        
       
    }catch(err) {
        log.error('Register Error')
         res.status(500).json({msg:'server problem'})
        return
    }
}
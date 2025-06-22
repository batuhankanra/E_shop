import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { log } from "../log/log";
import { config } from "../config";
import userService from "../services/user.service";


export const TokenVerification=async (req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(401).json({msg:'Yetkilendirme yok'})
        return
    }
    const token =authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,config.JWT_SECRET)as JwtPayload

        const extistUser=await userService.findId(decoded.id)
        if(!extistUser){
            res.status(400).json({msg:'Yetkiniz yok'})
            return
        }
        req.user=extistUser
        next()

    }catch(err){
        log.error('auth middleware')
        res.status(500).json({msg:'Yetkiniz yok'})
    }
}
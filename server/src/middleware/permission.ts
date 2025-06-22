import { Request,Response,NextFunction } from "express";
import roleService from "../services/role.service";
import { USerPRops } from "../typescript/props";
import { log } from "../log/log";



export const checkPermission=(requiredPermission:string)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        const user:USerPRops=req.user
        if(!user){
             res.status(401).json({ msg: 'Kullanıcı doğrulanamadı' });
             log.error('check permissions middleware problem')
            return
        }
        const permissions=await roleService.find({id:String(user.role)})
        if(!permissions?.permissions.includes(requiredPermission)){
            res.status(409).json({msg:'Yetkiniz yok'})
             log.error('check permissions middleware problem')

            return
        }
        next()

    }
}
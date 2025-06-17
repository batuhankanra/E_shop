import { Request,Response,NextFunction } from "express";
import { log } from "../log/log";


export const requestLogger=(req:Request,res:Response,next:NextFunction)=>{

    res.on('finish',()=>{
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;


    const message = `${method}----${url}----${status}`;

    if (status >= 500) {
      log.error(message);
    } else if (status >= 400) {
      log.warning(message); 
    } else if (status >= 300) {
      log.info(message); 
    } else {
      log.success(message); 
    }
  })
  next();
} 
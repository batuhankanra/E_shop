import mongoose from "mongoose";
import { config } from "../config";
import { log } from "../log/log";


export const db=async ()=>{
    try{
        await mongoose.connect(config.DB_URL)
        log.info('mongo db connect')
    }catch (err:any){
        log.error('DB could not be connected!')
    }
}